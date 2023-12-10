import { useTranslation } from 'next-i18next';
import { Button } from '@theme/button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

export interface IDialogSessionExpiredProps {
  open?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const DialogSessionExpired = (props: IDialogSessionExpiredProps) => {
  const { open = false, onLogin, onLogout } = props;
  const { t } = useTranslation();

  const handleLogin = () => {
    if (onLogin) onLogin();
  };
  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth sx={{ zIndex: 1350 }}>
      <DialogTitle>
        <Typography fontWeight={600} fontSize="1.1rem">
          {t('common:expired-title')}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Stack alignItems="flex-start">
          <Typography>{t('common:expired-message')}</Typography>
          <Typography>{t('common:expired-action')}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          {t('common:sign-out')}
        </Button>
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          {t('common:sign-in')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
