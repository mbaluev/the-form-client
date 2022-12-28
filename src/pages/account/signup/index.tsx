import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { MasterSite } from '@ui/masters/masterSite';
import { SignupForm } from '@ui/pages/account/signup/signupForm';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';

const Signup = () => {
  const { clearData, clearChanges } = useViewModel<IAuthViewModel>(
    VIEW_MODEL.Auth
  );

  useEffect(() => {
    clearData();
    clearChanges();
  }, []);

  return (
    <Page>
      <SignupForm />
    </Page>
  );
};

Signup.Layout = MasterSite;
export default observer(Signup);
