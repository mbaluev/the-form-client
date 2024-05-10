import Loader from '@components/loader';
import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { ProgressBase } from '@ui/layout/card/progress';
import { SeparatorBase } from '@ui/layout/card/separator';

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
          Save changes?
        </Typography>
      </DialogTitle>
      {loading ? <ProgressBase /> : <SeparatorBase />}
      <DialogContent>
        <Stack>
          <Typography>You have modified this page</Typography>
          <Typography>Do you want to save the changes before you go?</Typography>
        </Stack>
      </DialogContent>
      <SeparatorBase />
      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ flexBasis: '50%' }}
          startIcon={isLoadingCancel ? <Loader size={20} loading relative /> : undefined}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          onClick={handleDiscard}
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ flexBasis: '50%' }}
          startIcon={isLoadingDiscard ? <Loader size={20} loading relative /> : undefined}
          fullWidth
        >
          Discard changes
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ flexBasis: '50%' }}
          startIcon={isLoadingSave ? <Loader size={20} loading relative /> : undefined}
          fullWidth
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
