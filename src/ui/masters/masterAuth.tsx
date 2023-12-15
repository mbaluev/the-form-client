import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { Intro } from '@ui/layout/intro';

export const MasterAuth = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isLoading } = useAppStore();
  const { isAuth } = useAuthStore();
  return <Layout>{isAuth ? children : <Intro loading={isLoading} />}</Layout>;
});
