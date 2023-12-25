import 'reflect-metadata';
import { ReactElement } from 'react';
import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useRouter } from 'next/router';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache, createEmotionCacheRtl } from '@theme/emotionCache';
import { CssBaseline } from '@mui/material';
import { ContainerProvider } from '@provider/context';
import { theme } from '@theme/index';
import { appWithTranslation } from 'next-i18next';
import { ErrorBoundary } from '@utils/ui/errorBoundary';
import { EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import { containerInitialize } from '@provider/initialize';
import { SnackbarProvider } from 'notistack';
import dirs from '@utils/locale/dir';
import '../core/scss/index.scss';
import { CustomHead } from '@ui/layout/head';

configure({ enforceActions: 'observed' });
enableStaticRendering(typeof window === 'undefined');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const clientSideEmotionCacheRtl = createEmotionCacheRtl();

// init app
const container = containerInitialize();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const router = useRouter();
  const isRtl = dirs.isRtl();
  const {
    Component,
    emotionCache = isRtl ? clientSideEmotionCacheRtl : clientSideEmotionCache,
    pageProps,
  } = props;

  const getLayout = (Component as any).getLayout || ((page: ReactElement) => page);

  return (
    <ThemeProvider theme={{ ...theme, direction: dirs.getDir(router.locale) }}>
      <CacheProvider value={emotionCache}>
        <ErrorBoundary>
          <ContainerProvider container={container}>
            <SnackbarProvider
              maxSnack={10}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <CssBaseline />
              <CustomHead />
              {getLayout(<Component {...pageProps} />)}
            </SnackbarProvider>
          </ContainerProvider>
        </ErrorBoundary>
      </CacheProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
