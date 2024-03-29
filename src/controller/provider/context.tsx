import { Container } from 'inversify';
import { createContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { STORE } from '@store/ids';
import type IAppStore from '@store/modules/common/app/interface';
import type IFilterStore from '@store/modules/common/filter/interfaces';

interface IProps {
  container: Container;
  children?: ReactNode;
}

export const ContainerContext = createContext<Container | null>(null);

export const ContainerProvider = ({ container, children }: IProps) => {
  const router = useRouter();
  const appStore = container.get<IAppStore>(STORE.App);
  const filterStore = container.get<IFilterStore>(STORE.Filter);

  useEffect(() => {
    appStore.init();

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

  useEffect(() => {
    filterStore.changeRoute(router);
  }, [router]);

  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};
