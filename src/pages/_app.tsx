import 'reflect-metadata';
import { useEffect } from 'react';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import {
  createEmotionCache,
  createEmotionCacheRtl,
} from '@utils/cache/createEmotionCache';
import { initializeDiContainer } from '@app/diContainer/diContainer';
import { DiContainerProvider } from '@app/diContainer/diContainerProvider';
import { VIEW_MODEL } from '@viewModel/ids';
import { IAppViewModel } from '@viewModel/modules/common/app/interface';
import { LayoutEmpty } from '@ui/layout/layout';
import { ILocaleViewModel } from '@viewModel/modules/common/locale/interface';
import { SnackbarProvider } from 'notistack';
import { IMenuViewModel } from '@viewModel/modules/common/menu/interface';
import { IFilterViewModel } from '@viewModel/modules/common/filter/interfaces';
import { theme } from '../core/mui/theme';
import '../core/scss/index.scss';

configure({ enforceActions: 'observed' });
enableStaticRendering(typeof window === 'undefined');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const clientSideEmotionCacheRtl = createEmotionCacheRtl();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// container init
const container = initializeDiContainer();
const app = container.get<IAppViewModel>(VIEW_MODEL.App);
const locale = container.get<ILocaleViewModel>(VIEW_MODEL.Locale);
const menu = container.get<IMenuViewModel>(VIEW_MODEL.Menu);
const filter = container.get<IFilterViewModel>(VIEW_MODEL.Filter);

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = locale.isRtl
      ? clientSideEmotionCacheRtl
      : clientSideEmotionCache,
    pageProps,
  } = props;

  const Layout = (Component as any).Layout || LayoutEmpty;
  const router = useRouter();

  useEffect(() => {
    locale.changeLanguage(locale.language);
    menu.initiate();

    const handleStart = (url: string) => app.routeChangeStart(url);
    const handleStop = (url: string) => app.routeChangeComplete(url);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, []);

  useEffect(() => filter.loadFilters(router), [router]);

  return (
    <DiContainerProvider container={container}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme(router)}>
          <Head>
            <title>The Form</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
          </Head>
          <SnackbarProvider
            maxSnack={10}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </DiContainerProvider>
  );
};

export default observer(MyApp);
