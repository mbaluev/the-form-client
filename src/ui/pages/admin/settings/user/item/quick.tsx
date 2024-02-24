import { Fragment, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import CloseIcon from '@mui/icons-material/Close';
import { DialogDiscard } from '@ui/dialogs/dialogDiscard';
import { observer } from 'mobx-react';
import { useUserSettingsItemStore } from '@store/modules/settings/user/settings/item/hook';
import { IUserDTO } from '@model/entities/user';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { useUserSettingsListStore } from '@store/modules/settings/user/settings/list/hook';

export const Quick = observer(() => {
  const {
    isSaveLoading,
    isDeleteLoading,
    saveData,
    isDeleteOpen,
    addDeleteId,
    deleteOpen,
    deleteClose,
    deleteSubmit,
  } = useUserSettingsItemStore();
  const { getData: getUsers } = useUserSettingsListStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const isCreate = router.pathname === ROUTES.ADMIN_SETTINGS_USER_CREATE.path;
  const isEdit = router.pathname === ROUTES.ADMIN_SETTINGS_USER.path;

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext<IUserDTO>();

  // unsaved changes
  const { Prompt } = useUnsavedChanges(isDirty);
  const [isOpenDiscard, setIsOpenDiscard] = useState<boolean>(false);
  const handleSave = handleSubmit(async (data) => {
    const res = await saveData(data);
    if (res) {
      reset(res);
      if (isCreate) {
        setTimeout(() => {
          router.push({
            pathname: ROUTES.ADMIN_SETTINGS_USER.path,
            query: { slug: [res.id] },
          });
        });
      }
      if (isEdit) {
        await getUsers();
      }
    }
  });
  const handleDiscard = async () => {
    reset();
  };
  const handleDiscardClose = () => setIsOpenDiscard(false);
  const handleDiscardConfirm = async () => {
    reset();
  };

  // handlers
  const handleDelete = async () => {
    addDeleteId(id);
    await deleteOpen();
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
    <Fragment>
      <Stack direction="row" spacing={2}>
        <IconButton color="primary" onClick={handleSave} disabled={isSaveLoading || !isDirty}>
          <SaveIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleDelete} disabled={isSaveLoading || isCreate}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleClose} disabled={isSaveLoading}>
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
      <DialogDiscard open={isOpenDiscard} onClose={handleDiscardClose} onDiscard={handleDiscard} />
      <Prompt onDiscard={handleDiscardConfirm} onSave={handleSave} />
    </Fragment>
  );
});
