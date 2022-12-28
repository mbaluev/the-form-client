import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { LoginForm } from '@ui/pages/account/login/loginForm';
import { MasterSite } from '@ui/masters/masterSite';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';

const Login = () => {
  const { clearData, clearChanges } = useViewModel<IAuthViewModel>(
    VIEW_MODEL.Auth
  );

  useEffect(() => {
    clearData();
    clearChanges();
  }, []);

  return (
    <Page>
      <LoginForm />
    </Page>
  );
};

Login.Layout = MasterSite;
export default observer(Login);
