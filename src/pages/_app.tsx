import 'reflect-metadata';
import { ReactElement, useEffect } from 'react';
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
import { STORE } from '@store/ids';
import dirs from '@utils/locale/dir';
import type IAppStore from '@store/modules/common/app/interface';
import IAuthStore from '@store/modules/common/auth/interface';
import '../core/scss/index.scss';

configure({ enforceActions: 'observed' });
enableStaticRendering(typeof window === 'undefined');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const clientSideEmotionCacheRtl = createEmotionCacheRtl();

// init app
const container = containerInitialize();
const appStore = container.get<IAppStore>(STORE.App);
const authStore = container.get<IAuthStore>(STORE.Auth);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  token?: string;
}

const MyApp = (props: MyAppProps) => {
  const { token } = props;
  if (token) authStore.setToken(token);

  const router = useRouter();
  const isRtl = dirs.isRtl();
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
          <ThemeProvider
            theme={{ ...theme, direction: dirs.getDir(router.locale) }}
          >
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </ContainerProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

MyApp.getInitialProps = ({ ctx }: { ctx: any }) => {
  const token = ctx?.res?.req?.cookies?.token;
  return { token };
};

export default appWithTranslation(MyApp);
