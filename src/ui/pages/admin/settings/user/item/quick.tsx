import { IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export const Quick = () => {
  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="secondary" disabled>
        <SaveIcon />
      </IconButton>
      <IconButton color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary">
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};
