import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { Button, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { IMaterialDTO } from '@model/entities/material';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useMaterialItemStore } from '@store/modules/entities/material/item/useMaterialItemStore';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';

export const Actions = observer(() => {
  const { isSaveLoading, saveModalData } = useMaterialItemStore();

  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext<IMaterialDTO>();

  const { Prompt } = useUnsavedChanges(isDirty);

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
    if (res) await handleDiscard();
  });

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleClose} disabled={isSaveLoading} variant="outlined" color="primary">
          Discard
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
