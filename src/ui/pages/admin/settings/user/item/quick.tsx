import { IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';

export const Quick = () => {
  const router = useRouter();
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_USERS.path,
    });
  };
  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="secondary" disabled>
        <SaveIcon />
      </IconButton>
      <IconButton color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};
