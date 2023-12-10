import { useTranslation } from 'next-i18next';
import { Button } from '@theme/button';
import Loader from '@components/loader';
import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

export interface IDialogUnsavedProps {
  open: boolean;
  isLoadingCancel?: boolean;
  isLoadingDiscard?: boolean;
  isLoadingSave?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onDiscard?: () => void;
  onSave?: () => void;
}

export const DialogUnsaved = (props: IDialogUnsavedProps) => {
  const {
    open,
    isLoadingCancel,
    isLoadingDiscard,
    isLoadingSave,
    onClose,
    onCancel,
    onDiscard,
    onSave,
  } = props;
  const { t } = useTranslation();

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };
  const handleDiscard = () => {
    if (onDiscard) onDiscard();
    if (onClose) onClose();
  };
  const handleSave = () => {
    if (onSave) onSave();
    if (onClose) onClose();
  };

  const loading = isLoadingCancel || isLoadingDiscard || isLoadingSave;
  if (loading) return <Loader loading />;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth sx={{ zIndex: 1340 }}>
      <DialogTitle>
        <Typography fontWeight={600} fontSize="1.1rem">
          {t('common:unsaved-title')}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Stack>
          <Typography>{t('common:unsaved-message')}</Typography>
          <Typography>{t('common:unsaved-question')}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ flexBasis: '50%' }}
          startIcon={
            isLoadingCancel ? <Loader size={20} loading relative /> : undefined
          }
          fullWidth
        >
          {t('common:cancel')}
        </Button>
        <Button
          onClick={handleDiscard}
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ flexBasis: '50%' }}
          startIcon={
            isLoadingDiscard ? <Loader size={20} loading relative /> : undefined
          }
          fullWidth
        >
          {t('common:discard-changes')}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ flexBasis: '50%' }}
          startIcon={
            isLoadingSave ? <Loader size={20} loading relative /> : undefined
          }
          fullWidth
        >
          {t('common:save-changes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
