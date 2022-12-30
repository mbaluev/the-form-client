import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { MasterSchool } from '@ui/masters/masterSchool';
import { SignupForm } from '@ui/pages/account/signup/signupForm';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';

const Signup = () => {
  const { clearData, clearChanges, clearMessage } =
    useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);

  useEffect(() => {
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

Signup.Layout = MasterSchool;
export default observer(Signup);
