import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { MasterAnon } from '@ui/masters/masterAnon';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { SignUpForm } from '@ui/pages/account/signUp';
import { Page } from '@ui/layout/page';

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
      <Page>
        <SignUpForm sx={{ mt: 20 }} />
      </Page>
    </MasterAnon>
  );
};

export default observer(SignUp);
