import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { MasterSite } from '@ui/masters/masterSite';
import { RegisterForm } from '@ui/pages/account/register/registerForm';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';

const Register = () => {
  const { clearData, clearChanges } = useViewModel<IUserViewModel>(
    VIEW_MODEL.User
  );

  useEffect(() => {
    clearData();
    clearChanges();
  }, []);

  return (
    <Page>
      <RegisterForm />
    </Page>
  );
};

Register.Layout = MasterSite;
export default observer(Register);
