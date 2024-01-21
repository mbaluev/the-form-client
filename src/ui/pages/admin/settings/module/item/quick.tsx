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
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { useFormContext } from 'react-hook-form';
import { DialogDiscard } from '@ui/dialogs/dialogDiscard';
import { IModuleDTO } from '@model/entities/module';

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
  } = useModuleItemStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const isCreate = id === 'create';

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext<IModuleDTO>();

  // unsaved changes
  const { Prompt } = useUnsavedChanges(isDirty);
  const [isOpenDiscard, setIsOpenDiscard] = useState<boolean>(false);
  const handleSave = handleSubmit(async (data) => {
    const res = (await saveData(data)) as IModuleDTO;
    if (res) reset(res);
    if (res && isCreate) {
      setTimeout(() => {
        router.push({
          pathname: ROUTES.ADMIN_SETTINGS_MODULE.path,
          query: { slug: [res.id] },
        });
      });
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
