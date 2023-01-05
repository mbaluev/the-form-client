import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { SigninForm } from '@ui/pages/account/signin/signinForm';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';

const Signin = () => {
  const { clearData, clearChanges, clearMessage, clearToken } =
    useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);

  useEffect(() => {
    clearToken();
    clearData();
    clearChanges();
    clearMessage();
  }, []);

  return (
    <Page>
      <SigninForm />
    </Page>
  );
};

Signin.Layout = MasterSchool;
export default observer(Signin);
