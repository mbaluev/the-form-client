import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import Loader from '@components/loader';
import { Page } from '@ui/layout/page';
import { CustomHead } from '@ui/layout/customHead';
import { SignIn } from '@ui/pages/index/signin';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

export const MasterAuth = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isAuth } = useAuthStore();
  const { isLoading } = useAppStore();
  return (
    <Layout globalSearch support notifications>
      {isAuth && (isLoading ? <Loader relative loading /> : children)}
      {!isAuth &&
        (isLoading ? (
          <Loader relative loading />
        ) : (
          <Page {...props}>
            <CustomHead />
            <SignIn />
          </Page>
        ))}
    </Layout>
  );
});
