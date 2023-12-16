import { LinearProgress, Stack, useTheme } from '@mui/material';
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

const StyledStack = styled(Stack)(({ theme }) => ({
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
}));

interface IProps {
  loading?: boolean;
}

export const Intro = observer((props: IProps) => {
  const { loading } = props;
  const { isAuth } = useAuthStore();
  const { isLoading } = useAppStore();
  const theme = useTheme();

  const [opacity, setOpacity] = useState<number>(loading ? 0 : 1);
  useEffect(() => setOpacity(1), []);

  return (
    <StyledStack spacing={4} alignItems="center" justifyContent="center" sx={{ opacity, mt: 30 }}>
      <LogoTheForm sx={{ fontSize: '6rem', fill: theme.palette.primary.main }} />
      <Stack spacing={1} alignItems="center">
        <Typography fontWeight={600} color={theme.palette.primary.main} fontSize="1.5rem">
          The Form
        </Typography>
        <Typography fontWeight={600} color={theme.palette.primary.main}>
          School of analytics
        </Typography>
      </Stack>
      {loading && <LinearProgress sx={{ width: 200 }} />}
      {!isAuth && !isLoading && (
        <Stack direction="row" spacing={2}>
          <Link passHref href={ROUTES.ACCOUNT_SIGN_IN.path}>
            <Button variant="contained">Sign in</Button>
          </Link>
          <Link passHref href={ROUTES.ACCOUNT_SIGN_UP.path}>
            <Button variant="contained" color="success">
              Sign up
            </Button>
          </Link>
        </Stack>
      )}
    </StyledStack>
  );
});
