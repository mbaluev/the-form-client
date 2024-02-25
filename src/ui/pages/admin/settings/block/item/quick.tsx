import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useFormContext } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/item/hook';
import { useBlockSettingsListStore } from '@store/modules/settings/block/list/hook';
import { ParsedUrlQuery } from 'querystring';

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
  } = useBlockSettingsItemStore();
  const { getData: getBlocks } = useBlockSettingsListStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const moduleId = router.query.moduleId as string;
  const isCreate = router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path;
  const isEdit = router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK.path;

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext<IBlockDTO>();

  // unsaved changes
  const { Prompt } = useUnsavedChanges(isDirty);

  // handlers
  const handleDelete = async () => {
    addDeleteId(id);
    await deleteOpen();
  };
  const handleDeleteSubmit = async () => {
    const result = await deleteSubmit();
    if (result) {
      const query: ParsedUrlQuery = {};
      if (moduleId) query.moduleId = moduleId;
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_BLOCKS.path,
        query,
      });
    }
  };
  const handleClose = async () => {
    const query: ParsedUrlQuery = {};
    if (moduleId) query.moduleId = moduleId;
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCKS.path,
      query,
    });
  };
  const handleDiscard = async () => {
    reset();
  };
  const handleSave = handleSubmit(async (data) => {
    const res = await saveData(data);
    if (res) {
      reset(res);
      if (isCreate) {
        setTimeout(() => {
          const query: ParsedUrlQuery = { slug: [id] };
          if (moduleId) query.moduleId = moduleId;
          router.push({
            pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
            query,
          });
        }, 100);
      }
      if (isEdit) {
        await getBlocks();
      }
    }
  });

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
          title="Delete block"
          message="Are you sure you want to delete block?"
        />
      </Stack>
      <Prompt onDiscard={handleDiscard} onSave={handleSave} />
    </Fragment>
  );
});
