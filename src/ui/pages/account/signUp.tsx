import { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { ROUTES } from '@settings/routes';
import { Box, Button, Stack } from '@mui/material';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { TextInputField } from '@components/fields/textInputField';
import { SxProps } from '@mui/system';
import Link from 'next/link';
import { ProgressShort } from '@ui/layout/card/progress';
import { TitleDividerShort } from '@ui/layout/card/divider';

interface IProps {
  sx?: SxProps;
}

export const SignUpForm = observer((props: IProps) => {
  const { sx } = props;
  const { data, changeField, getError, signUp, hasErrors, clearMessage, isDataLoading } =
    useAuthStore();

  const router = useRouter();
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const submitHandler = async () => {
    clearMessage();
    if (await signUp()) {
      await router.replace({
        pathname: ROUTES.ERROR402.path,
      });
    }
  };

  return (
    <Stack sx={sx} alignItems="center">
      <Box sx={{ maxWidth: 300, minWidth: 300 }}>
        <FormSection>
          <FormField title="First name">
            <TextInputField
              name="firstname"
              value={data?.firstname}
              onChange={changeHandler}
              error={Boolean(getError('firstname'))}
              helperText={getError('firstname')?.message}
            />
          </FormField>
          <FormField title="Last name">
            <TextInputField
              name="lastname"
              value={data?.lastname}
              onChange={changeHandler}
              error={Boolean(getError('lastname'))}
              helperText={getError('lastname')?.message}
            />
          </FormField>
          <FormField title="Email">
            <TextInputField
              name="username"
              value={data?.username}
              onChange={changeHandler}
              error={Boolean(getError('username'))}
              helperText={getError('username')?.message}
            />
          </FormField>
          <FormField title="Password">
            <TextInputField
              name="password"
              value={data?.password}
              onChange={changeHandler}
              error={Boolean(getError('password'))}
              helperText={getError('password')?.message}
            />
          </FormField>
          <Button variant="contained" onClick={submitHandler} color="success" disabled={hasErrors}>
            Sign up
          </Button>
          {isDataLoading ? <ProgressShort /> : <TitleDividerShort />}
          <Stack direction="row" spacing={4}>
            <Link passHref href={ROUTES.HOME.path} style={{ flex: '1 1 auto' }}>
              <Button variant="outlined" fullWidth>
                The Form
              </Button>
            </Link>
            <Link passHref href={ROUTES.ACCOUNT_SIGN_IN.path} style={{ flex: '1 1 auto' }}>
              <Button variant="outlined" fullWidth>
                Sign in
              </Button>
            </Link>
          </Stack>
        </FormSection>
      </Box>
    </Stack>
  );
});
