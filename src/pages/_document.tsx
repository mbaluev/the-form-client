import Document, { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache, createEmotionCacheRtl } from '@theme/emotionCache';
import { i18n } from 'next-i18next';
import dirs from '@utils/locale/dir';

type Props = DocumentProps & {
  // add custom document props
};

export default class MyDocument extends Document<Props> {
  render() {
    return (
      <Html dir={dirs.getDir()}>
        <Head>
          <link rel="icon" type="image/png" sizes="64x64" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon.ico" />
          <meta name="msapplication-square70x70logo" content="/favicon/favicon.ico" />
          <meta name="msapplication-square150x150logo" content="/favicon/favicon.ico" />
          <meta name="msapplication-square310x310logo" content="/favicon/favicon.ico" />
          <meta name="msapplication-wide310x150logo" content="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#111" />

          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = i18n?.dir(ctx.locale) === 'rtl' ? createEmotionCacheRtl() : createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
