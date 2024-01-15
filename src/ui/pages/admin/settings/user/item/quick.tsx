import { IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';

export const Quick = observer(() => {
  const {
    data,
    isDataLoading,
    hasChanges,
    validate,
    saveData,
    isDeleteOpen,
    isDeleteLoading,
    addDeleteId,
    deleteOpen,
    deleteClose,
    deleteSubmit,
    hasErrors,
    clearChanges,
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
  const handleDoSave = async () => {
    const user = await saveData();
    if (user?.id) {
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_USER.path,
        query: { id: user.id },
      });
    }
  };
  const handleSave = async () => {
    const isValid = validate();
    if (isValid) await handleDoSave();
  };
  const handleDiscard = async () => {
    await clearChanges();
  };

  const { Prompt } = useUnsavedChanges(hasChanges);

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <IconButton
          color="primary"
          onClick={handleSave}
          disabled={!hasChanges || hasErrors || isDataLoading}
        >
          <SaveIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleDelete} disabled={isDataLoading}>
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
      <Prompt onSave={handleSave} onDiscard={handleDiscard} />
    </Fragment>
  );
});
