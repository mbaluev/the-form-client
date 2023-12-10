import 'reflect-metadata';
import { ReactElement, useEffect } from 'react';
import { autorun, configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useRouter } from 'next/router';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache, createEmotionCacheRtl } from '@theme/emotionCache';
import { CssBaseline } from '@mui/material';
import { ContainerProvider } from '@provider/context';
import { theme } from '@theme/index';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { ErrorBoundary } from '@utils/ui/errorBoundary';
import { EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '@store/modules/common/auth/provider';
import { AppProvider } from '@store/modules/common/app/provider';
import { containerInitialize } from '@provider/initialize';
import { STORE } from '@store/ids';
import type IAppStore from '@store/modules/common/app/interface';
import '../core/scss/index.scss';

configure({ enforceActions: 'observed' });
enableStaticRendering(typeof window === 'undefined');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const clientSideEmotionCacheRtl = createEmotionCacheRtl();

// init app
const container = containerInitialize();
const appStore = container.get<IAppStore>(STORE.App);
autorun(() => appStore.init());

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const {
    Component,
    emotionCache = isRtl ? clientSideEmotionCacheRtl : clientSideEmotionCache,
    pageProps,
  } = props;

  const getLayout =
    (Component as any).getLayout || ((page: ReactElement) => page);

  useEffect(() => {
    const handleStart = () => appStore.routeChangeStart();
    const handleComplete = () => appStore.routeChangeComplete();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <ContainerProvider container={container}>
          <AppProvider>
            <AuthProvider>
              <ThemeProvider
                theme={{ ...theme, direction: i18n.dir(router.locale) }}
              >
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            </AuthProvider>
          </AppProvider>
        </ContainerProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(MyApp);
