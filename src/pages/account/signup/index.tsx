import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { SignupForm } from '@ui/pages/account/signup/signupForm';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { MasterAnon } from '@ui/masters/masterAnon';

const Signup = () => {
  const { clearData, clearChanges, clearMessage, clearToken } = useViewModel<IAuthViewModel>(
    VIEW_MODEL.Auth
  );

  useEffect(() => {
    clearToken();
    clearData();
    clearChanges();
    clearMessage();
  }, []);

  return (
    <Page>
      <SignupForm />
    </Page>
  );
};

Signup.Layout = MasterAnon;
export default observer(Signup);
