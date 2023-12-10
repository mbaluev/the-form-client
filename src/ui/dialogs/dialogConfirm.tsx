import { useTranslation } from 'next-i18next';
import { Button } from '@theme/button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

interface IProps {
  open: boolean;
  onClose?: () => Promise<void>;
  onSubmit?: () => Promise<void>;
  isLoading?: boolean;
  title?: string;
  message?: string;
  error?: string;
}

export const DialogConfirm = (props: IProps) => {
  const { open, onClose, onSubmit, isLoading, title, message, error } = props;
  const { t } = useTranslation();

  const handleClose = async () => {
    if (onClose) await onClose();
  };
  const handleSubmit = async () => {
    if (onSubmit) await onSubmit();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth sx={{ zIndex: 1340 }}>
      <DialogTitle>
        <Stack spacing={1}>
          <Typography fontWeight={600} fontSize="1.1rem">
            {title || t('common:confirm-title')}
          </Typography>
          {error && (
            <Typography fontWeight={600} fontSize="0.9rem" color="error">
              {error}
            </Typography>
          )}
        </Stack>
      </DialogTitle>
      {isLoading && <LinearProgress sx={{ borderRadius: 0 }} />}
      <DialogContent sx={{ pb: 0 }}>
        <Typography textAlign="left">{message || t('common:confirm-message')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          {t('common:confirm-no')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          {t('common:confirm-yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
