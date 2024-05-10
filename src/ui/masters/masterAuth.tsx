import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { Intro } from '@ui/pages/index/intro';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';

interface IProps {
  children?: ReactNode;
}

export const MasterAuth = observer((props: IProps) => {
  const { children } = props;
  const { isAuth } = useAuthStore();
  const { router } = useFilterStore();
  return <Layout>{isAuth && router?.isReady ? children : <Intro />}</Layout>;
});
