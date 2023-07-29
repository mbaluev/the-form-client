import React, { ChangeEvent } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { PasswordFieldControl, TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { Alert } from '@components/alert';
import { Loader } from '@components/loader';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import './index.scss';

export const SigninForm = observer(() => {
  const {
    isAuth,
    data,
    changeField,
    getError,
    signin,
    hasErrors,
    message,
    clearMessage,
  } = useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);

  const router = useRouter();
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const submitHandler = async () => {
    clearMessage();
    if (await signin()) {
      await router.push({
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path,
      });
    }
  };

  return (
    <div className="signin-form">
      {isAuth ? (
        <Loader loading relative />
      ) : (
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
                Sign in
              </Button>
            </FormField>
          </FormSection>
        </Form>
      )}
    </div>
  );
});
