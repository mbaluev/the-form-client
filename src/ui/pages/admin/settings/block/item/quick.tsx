import { IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { observer } from 'mobx-react';
import { Fragment, useState } from 'react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useFormContext } from 'react-hook-form';
import { DialogDiscard } from '@ui/dialogs/dialogDiscard';
import { IBlockDTO } from '@model/entities/block';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { useBlockListStore } from '@store/modules/entities/block/list/useBlockListStore';

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
  } = useBlockItemStore();
  const { getData: getBlocks } = useBlockListStore();

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
  const [isOpenDiscard, setIsOpenDiscard] = useState<boolean>(false);
  const handleSave = handleSubmit(async (data) => {
    const res = await saveData(data);
    if (res) {
      reset(res);
      if (isCreate) {
        setTimeout(() => {
          router.push({
            pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
            query: { slug: [res.id], moduleId },
          });
        }, 100);
      }
      if (isEdit) {
        await getBlocks();
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
      pathname: ROUTES.ADMIN_SETTINGS_BLOCKS.path,
      query: { moduleId },
    });
  };
  const handleDeleteSubmit = async () => {
    const result = await deleteSubmit();
    if (result) {
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_BLOCKS.path,
        query: { moduleId },
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
          title="Delete block"
          message="Are you sure you want to delete block?"
        />
      </Stack>
      <DialogDiscard open={isOpenDiscard} onClose={handleDiscardClose} onDiscard={handleDiscard} />
      <Prompt onDiscard={handleDiscardConfirm} onSave={handleSave} />
    </Fragment>
  );
});
