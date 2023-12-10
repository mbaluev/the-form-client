import { observer } from 'mobx-react';
import { Fragment, ReactNode, useEffect } from 'react';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { useRouter } from 'next/router';
import { useAppStore } from '@store/modules/common/app/useAppStore';

interface IProps {
  children?: ReactNode;
}

export const AppProvider = observer((props: IProps) => {
  const { children } = props;
  const router = useRouter();

  // handle change route
  const { changeRoute } = useFilterStore();
  const { changeRoute: changeRouteApp } = useAppStore();
  const { clear } = useNotifyStore();
  useEffect(() => {
    changeRoute(router);
    changeRouteApp(router);
    clear();
  }, [router]);

  return <Fragment>{children}</Fragment>;
});
