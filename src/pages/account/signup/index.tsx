import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { MasterAnon } from '@ui/masters/masterAnon';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { SignUpForm } from '@ui/pages/account/signUp';

const SignUp = () => {
  const { clearData, clearChanges, clearMessage, clearToken } = useAuthStore();

  useEffect(() => {
    clearToken();
    clearData();
    clearChanges();
    clearMessage();
  }, []);

  return (
    <MasterAnon>
      <SignUpForm sx={{ pt: 20 }} />
    </MasterAnon>
  );
};

export default observer(SignUp);
