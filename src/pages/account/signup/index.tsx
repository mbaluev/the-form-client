import { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { MasterAnon } from '@ui/masters/masterAnon';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

const SignUp = (props: any) => {
  const { clearData, clearChanges, clearMessage, clearToken } = useAuthStore();

  useEffect(() => {
    clearToken();
    clearData();
    clearChanges();
    clearMessage();
  }, []);

  return (
    <MasterAnon>
      <Page {...props}>SignUpForm</Page>
    </MasterAnon>
  );
};

export default observer(SignUp);
