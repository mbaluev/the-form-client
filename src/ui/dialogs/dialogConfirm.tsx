import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { ProgressBase } from '@ui/layout/card/progress';
import { SeparatorBase } from '@ui/layout/card/separator';

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
            {title || 'Confirm'}
          </Typography>
          {error && (
            <Typography fontWeight={600} fontSize="0.9rem" color="error">
              {error}
            </Typography>
          )}
        </Stack>
      </DialogTitle>
      {isLoading ? <ProgressBase /> : <SeparatorBase />}
      <DialogContent>
        <Typography textAlign="left">{message || 'Are you sure?'}</Typography>
      </DialogContent>
      <SeparatorBase />
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          sx={{ flexBasis: '50%' }}
          disabled={isLoading}
          fullWidth
        >
          No
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ flexBasis: '50%' }}
          disabled={isLoading}
          fullWidth
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
