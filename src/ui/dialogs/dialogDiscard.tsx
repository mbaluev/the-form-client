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

export interface IDialogDiscardProps {
  open: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onDiscard?: () => void;
}

export const DialogDiscard = (props: IDialogDiscardProps) => {
  const { open, onClose, onCancel, onDiscard } = props;
  const { t } = useTranslation();

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };
  const handleDiscard = () => {
    if (onDiscard) onDiscard();
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth sx={{ zIndex: 1340 }}>
      <DialogTitle>
        <Typography fontWeight={600} fontSize="1.1rem">
          {t('common:discard-title')}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Stack alignItems="flex-start">
          <Typography textAlign="left">
            {t('common:discard-question')}
          </Typography>
          <Typography textAlign="left">
            {t('common:discard-message')}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          {t('common:cancel')}
        </Button>
        <Button
          onClick={handleDiscard}
          variant="contained"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          {t('common:discard-changes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
