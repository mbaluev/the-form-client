import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { SeparatorBase } from '@ui/layout/card/separator';

export interface IDialogDiscardProps {
  open: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onDiscard?: () => void;
}

export const DialogDiscard = (props: IDialogDiscardProps) => {
  const { open, onClose, onCancel, onDiscard } = props;

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };
  const handleDiscard = () => {
    if (onDiscard) onDiscard();
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth sx={{ zIndex: 1340 }}>
      <DialogTitle>
        <Typography fontWeight={600} fontSize="1.1rem">
          Confirm discard
        </Typography>
      </DialogTitle>
      <SeparatorBase />
      <DialogContent>
        <Stack alignItems="flex-start">
          <Typography textAlign="left">Are you sure you want to discard all changes?</Typography>
          <Typography textAlign="left">They won't be saved</Typography>
        </Stack>
      </DialogContent>
      <SeparatorBase />
      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          onClick={handleDiscard}
          variant="contained"
          color="primary"
          sx={{ flexBasis: '50%' }}
          fullWidth
        >
          Discard changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
