import { observer } from 'mobx-react';
import { MsalProvider } from '@azure/msal-react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { ReactNode } from 'react';

export const AuthProvider = observer((props: { children: ReactNode }) => {
  const { children } = props;
  const { instance } = useAuthStore();
  return <MsalProvider instance={instance}>{children}</MsalProvider>;
});
