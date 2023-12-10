import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import Loader from '@components/loader';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from '@settings/msal';
import {
  AuthenticatedTemplate,
  MsalAuthenticationTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

export const MasterLogin = observer((props: { children?: ReactNode }) => {
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
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={loginRequest}
          />
        )}
      </UnauthenticatedTemplate>
    </Layout>
  );
});
