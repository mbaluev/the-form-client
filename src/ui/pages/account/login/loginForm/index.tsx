import React, { ChangeEvent } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { PasswordFieldControl, TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import './index.scss';

export const LoginForm = observer(() => {
  const { data, changeField, getError, validate, hasErrors } =
    useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const submitHandler = () => {
    validate();
  };

  return (
    <div className="login-form">
      <Form cols={1}>
        <FormSection>
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
              Login
            </Button>
          </FormField>
        </FormSection>
      </Form>
    </div>
  );
});
