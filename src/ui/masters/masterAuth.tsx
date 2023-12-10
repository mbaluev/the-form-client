import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import Loader from '@components/loader';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { Page } from '@ui/layout/page';
import { CustomHead } from '@ui/layout/customHead';
import { SignIn } from '@ui/pages/index/signin';

export const MasterAuth = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isLoading } = useAppStore();
  return (
    <Layout>
      <AuthenticatedTemplate>
        {isLoading ? <Loader relative loading /> : children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {isLoading ? (
          <Loader relative loading />
        ) : (
          <Page {...props}>
            <CustomHead />
            <SignIn />
          </Page>
        )}
      </UnauthenticatedTemplate>
    </Layout>
  );
});
