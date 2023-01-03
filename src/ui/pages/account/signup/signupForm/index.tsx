import React, { ChangeEvent } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { PasswordFieldControl, TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { useRouter } from 'next/router';
import { Loader } from '@components/loader';
import { Alert } from '@components/alert';
import './index.scss';

export const SignupForm = observer(() => {
  const {
    data,
    changeField,
    getError,
    signup,
    hasErrors,
    message,
    clearMessage,
    isDataLoading,
  } = useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);

  const router = useRouter();
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const submitHandler = async () => {
    clearMessage();
    if (await signup()) {
      await router.replace({
        pathname: ROUTER_CONST_SCHOOL.ERROR402.path,
      });
    }
  };

  return (
    <div className="signup-form">
      <Loader loading={isDataLoading} />
      <Form cols={1}>
        <FormSection>
          {message && (
            <Alert
              message={message}
              variant="outlined"
              type="error"
              shadow={false}
            />
          )}
          <FormField title="First name">
            <TextFieldControl
              name="firstname"
              value={data?.firstname}
              onChange={changeHandler}
              error={Boolean(getError('firstname'))}
              helperText={getError('firstname')?.message}
            />
          </FormField>
          <FormField title="Last name">
            <TextFieldControl
              name="lastname"
              value={data?.lastname}
              onChange={changeHandler}
              error={Boolean(getError('lastname'))}
              helperText={getError('lastname')?.message}
            />
          </FormField>
          <FormField title="Email">
            <TextFieldControl
              name="username"
              value={data?.username}
              onChange={changeHandler}
              error={Boolean(getError('username'))}
              helperText={getError('username')?.message}
            />
          </FormField>
          <FormField title="Password">
            <PasswordFieldControl
              name="password"
              value={data?.password}
              onChange={changeHandler}
              error={Boolean(getError('password'))}
              helperText={getError('password')?.message}
            />
          </FormField>
          <FormField>
            <Button onClick={submitHandler} disabled={hasErrors}>
              Signup
            </Button>
          </FormField>
        </FormSection>
      </Form>
    </div>
  );
});
