import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';
import { observer } from 'mobx-react';

export const Quick = observer(() => {
  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="primary">
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
});
