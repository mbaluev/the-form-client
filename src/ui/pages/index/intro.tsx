import { Stack, useTheme } from '@mui/material';
import LogoTheForm from '@components/svg/logo/components/theForm';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '@theme/button';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { ROUTES } from '@settings/routes';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { ProgressShort } from '@ui/layout/card/progress';
import { TitleDividerShort } from '@ui/layout/card/divider';

const StyledStack = styled(Stack)(({ theme }) => ({
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const Intro = observer(() => {
  const { isAuth } = useAuthStore();
  const { isLoading } = useAppStore();
  const theme = useTheme();

  const [opacity, setOpacity] = useState<number>(isLoading ? 0 : 1);
  useEffect(() => setOpacity(1), []);

  return (
    <StyledStack spacing={4} alignItems="center" justifyContent="center" sx={{ opacity, mt: 20 }}>
      <LogoTheForm sx={{ fontSize: '6rem', fill: theme.palette.primary.main }} />
      <Stack spacing={1} alignItems="center">
        <Typography fontWeight={600} color={theme.palette.primary.main} fontSize="1.5rem">
          The Form
        </Typography>
        <Typography fontWeight={600} color={theme.palette.primary.main}>
          School of analytics
        </Typography>
      </Stack>
      {isLoading ? (
        <ProgressShort sx={{ width: 300 }} />
      ) : (
        <TitleDividerShort sx={{ width: 300 }} />
      )}
      {!isAuth && !isLoading && (
        <Stack direction="row" spacing={4} sx={{ maxWidth: 300, minWidth: 300 }}>
          <Link passHref href={ROUTES.ACCOUNT_SIGN_IN.path} style={{ flex: '1 1 auto' }}>
            <Button variant="contained" fullWidth>
              Sign in
            </Button>
          </Link>
          <Link passHref href={ROUTES.ACCOUNT_SIGN_UP.path} style={{ flex: '1 1 auto' }}>
            <Button variant="contained" color="success" fullWidth>
              Sign up
            </Button>
          </Link>
        </Stack>
      )}
    </StyledStack>
  );
});
