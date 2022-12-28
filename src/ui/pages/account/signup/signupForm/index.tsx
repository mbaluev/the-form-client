import React, { ChangeEvent } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { PasswordFieldControl, TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import './index.scss';

export const SignupForm = observer(() => {
  const { data, changeField, getError, signup, hasErrors } =
    useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const submitHandler = () => {
    signup();
  };

  return (
    <div className="signup-form">
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
              Signup
            </Button>
          </FormField>
        </FormSection>
      </Form>
    </div>
  );
});
