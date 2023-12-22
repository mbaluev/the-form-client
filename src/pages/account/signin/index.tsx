import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { MasterAnon } from '@ui/masters/masterAnon';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { SignInForm } from '@ui/pages/account/signIn';
import { Page } from '@ui/layout/page';

const SignIn = () => {
  const { clearData, clearChanges, clearMessage, clearToken } = useAuthStore();

  useEffect(() => {
    clearToken();
    clearData();
    clearChanges();
    clearMessage();
  }, []);

  return (
    <MasterAnon>
      <Page>
        <SignInForm sx={{ mt: 20 }} />
      </Page>
    </MasterAnon>
  );
};

export default observer(SignIn);
