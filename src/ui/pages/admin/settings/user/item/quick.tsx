import { IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { observer } from 'mobx-react';

export const Quick = observer(() => {
  const {
    data,
    hasChanges,
    saveData,
    isDeleteOpen,
    isDeleteLoading,
    addDeleteId,
    deleteOpen,
    deleteClose,
    deleteSubmit,
    hasErrors,
  } = useUserItemStore();

  const router = useRouter();
  const handleDelete = async () => {
    addDeleteId(data?.id);
    deleteOpen();
  };
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_USERS.path,
    });
  };
  const handleDeleteSubmit = async () => {
    const result = await deleteSubmit();
    if (result) {
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_USERS.path,
      });
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="primary" onClick={saveData} disabled={!hasChanges || hasErrors}>
        <SaveIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogConfirm
        open={isDeleteOpen}
        isLoading={isDeleteLoading}
        onClose={deleteClose}
        onSubmit={handleDeleteSubmit}
        title="Delete user"
        message="Are you sure you want to delete user?"
      />
    </Stack>
  );
});
