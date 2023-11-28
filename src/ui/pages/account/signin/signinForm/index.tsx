import { ChangeEvent } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { PasswordFieldControl, TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { Alert } from '@components/alert';
import { signIn, signOut, useSession } from 'next-auth/react';
import './index.scss';

export const SigninForm = observer(() => {
  const session = useSession();
  console.log(session);

  const {
    data,
    changeField,
    getError,
    hasErrors,
    message,
    setMessage,
    clearMessage,
  } = useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);

  // const router = useRouter();
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const loginHandler = async (e: any) => {
    e.preventDefault();
    await clearMessage();
    const res = await signIn('login', {
      username: data?.username,
      password: data?.password,
      redirect: false,
    });
    if (res && res.ok) {
      // const url = { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path };
      // const as = undefined;
      // const options = { shallow: true };
      // await router.push(url, as, options);
    } else {
      setMessage('Wrong username of password');
    }
  };

  return (
    <div className="signin-form">
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
            <Button
              onClick={loginHandler}
              disabled={hasErrors || session.status === 'authenticated'}
            >
              Sign in
            </Button>
            <Button
              onClick={() => signOut()}
              disabled={session.status === 'unauthenticated'}
            >
              Sign out
            </Button>
          </FormField>
        </FormSection>
      </Form>
    </div>
  );
});
