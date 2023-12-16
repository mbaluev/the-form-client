import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { MasterAnon } from '@ui/masters/masterAnon';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { SignInForm } from '@ui/pages/account/signIn';

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
      <SignInForm sx={{ mt: 20 }} />
    </MasterAnon>
  );
};

export default observer(SignIn);
