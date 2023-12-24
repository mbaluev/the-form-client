import { Button, Stack, useTheme } from '@mui/material';
import LogoTheForm from '@components/svg/logo/components/theForm';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { ROUTES } from '@settings/routes';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { ProgressBase } from '@ui/layout/card/progress';
import { TitleDividerShort } from '@ui/layout/card/divider';

export const Intro = observer(() => {
  const { isAuth } = useAuthStore();
  const { isLoading } = useAppStore();
  const theme = useTheme();
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ mt: 20 }}>
      <LogoTheForm sx={{ fontSize: '5rem', fill: theme.palette.primary.main }} />
      <Stack spacing={1} alignItems="center">
        <Typography fontWeight={600} color={theme.palette.primary.main} fontSize="1.5rem">
          The Form
        </Typography>
        <Typography fontWeight={600} color={theme.palette.primary.main}>
          School of analytics
        </Typography>
      </Stack>
      {isLoading ? <ProgressBase sx={{ width: 300 }} /> : <TitleDividerShort sx={{ width: 300 }} />}
      <Stack
        direction="row"
        spacing={4}
        sx={{ maxWidth: 300, minWidth: 300 }}
        justifyContent="center"
      >
        {isAuth && (
          <Link passHref href={ROUTES.SCHOOL_MODULES.path}>
            <Button variant="contained">Go to modules</Button>
          </Link>
        )}
        {!isAuth && (
          <Link passHref href={ROUTES.ACCOUNT_SIGN_IN.path} style={{ flex: '1 1 auto' }}>
            <Button variant="contained" fullWidth>
              Sign in
            </Button>
          </Link>
        )}
        {!isAuth && (
          <Link passHref href={ROUTES.ACCOUNT_SIGN_UP.path} style={{ flex: '1 1 auto' }}>
            <Button variant="contained" color="success" fullWidth>
              Sign up
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
});
