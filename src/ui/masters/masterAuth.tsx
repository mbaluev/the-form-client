import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import Loader from '@components/loader';
import { SignIn } from '@ui/pages/index/signin';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

export const MasterAuth = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isLoading } = useAppStore();
  const { isAuth } = useAuthStore();
  return (
    <Layout>{isLoading ? <Loader relative loading /> : isAuth ? children : <SignIn />}</Layout>
  );
});
