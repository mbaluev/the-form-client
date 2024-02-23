import { observer } from 'mobx-react';
import { Fragment, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { useTaskItemStore } from '@store/modules/entities/task/item/useTaskItemStore';
import { ITaskDTO } from '@model/entities/task';

export const Actions = observer(() => {
  const { isSaveLoading, saveModalData } = useTaskItemStore();

  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext<ITaskDTO>();

  const { Prompt } = useUnsavedChanges(isDirty);
  const [success, setSuccess] = useState<boolean>(false);

  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab] },
    });
  };
  const handleDiscard = async () => {
    reset();
  };
  const handleSave = handleSubmit(async (data) => {
    const res = await saveModalData(data);
    if (res) {
      await handleDiscard();
      setSuccess(true);
    }
  });

  useEffect(() => {
    if (success) {
      setSuccess(false);
      handleClose();
    }
  }, [success]);

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleClose} disabled={isSaveLoading} variant="outlined" color="primary">
          Close
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaveLoading || !isDirty}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Stack>
      <Prompt onDiscard={handleDiscard} onSave={handleSave} />
    </Fragment>
  );
});
