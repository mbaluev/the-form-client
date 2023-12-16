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

export const SignInForm = observer((props: IProps) => {
  const { sx } = props;
  const { data, changeField, getError, signin, hasErrors, clearMessage, isDataLoading } =
    useAuthStore();

  const router = useRouter();
  const changeHandler = (e: ChangeEvent<any>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const submitHandler = async () => {
    clearMessage();
    if (await signin()) {
      await router.push({
        pathname: ROUTES.HOME.path,
      });
    }
  };

  return (
    <Stack sx={sx} alignItems="center">
      <Box sx={{ maxWidth: 300, minWidth: 300 }}>
        <FormSection>
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
          <Button variant="contained" onClick={submitHandler} disabled={hasErrors} fullWidth>
            Sign in
          </Button>
          {isDataLoading ? <ProgressShort /> : <TitleDividerShort />}
          <Link passHref href={ROUTES.ACCOUNT_SIGN_UP.path}>
            <Button variant="text" color="success" fullWidth>
              Sign up
            </Button>
          </Link>
        </FormSection>
      </Box>
    </Stack>
  );
});