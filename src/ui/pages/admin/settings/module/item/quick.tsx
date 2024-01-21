import { IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';

export const Quick = observer(() => {
  const {
    data,
    isDataLoading,
    hasChanges,
    validate,
    saveData,
    // getData,
    isDeleteOpen,
    isDeleteLoading,
    addDeleteId,
    deleteOpen,
    deleteClose,
    deleteSubmit,
    hasErrors,
    clearChanges,
  } = useModuleItemStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const isCreate = id === 'create';

  const handleDelete = async () => {
    addDeleteId(data?.id);
    deleteOpen();
  };
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_MODULES.path,
    });
  };
  const handleDeleteSubmit = async () => {
    const result = await deleteSubmit();
    if (result) {
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_MODULES.path,
      });
    }
  };
  const handleDoSave = async () => {
    const item = await saveData();
    if (item?.id) {
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_MODULE.path,
        query: { slug: [item.id] },
      });
    }
  };
  const handleSave = async () => {
    const isValid = validate();
    if (isValid) await handleDoSave();
  };
  const handleDiscard = async () => {
    await clearChanges();
    // await getData(id);
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
        <IconButton color="primary" onClick={handleDelete} disabled={isCreate || isDataLoading}>
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
          title="Delete module"
          message="Are you sure you want to delete module?"
        />
      </Stack>
      <Prompt onSave={handleSave} onDiscard={handleDiscard} />
    </Fragment>
  );
});
