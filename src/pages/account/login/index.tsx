import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { LoginForm } from '@ui/pages/account/login/loginForm';
import { MasterSite } from '@ui/masters/masterSite';
import { useViewModel } from '@hooks/useViewModel';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';

const Login = () => {
  const { clearData, clearChanges } = useViewModel<IUserViewModel>(
    VIEW_MODEL.User
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
