import React, { useEffect } from 'react';
import { Page } from '@ui/layout/page';
import { SigninForm } from '@ui/pages/account/signin/signinForm';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { MasterAnon } from '@ui/masters/masterAnon';

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

Signin.Layout = MasterAnon;
export default observer(Signin);
