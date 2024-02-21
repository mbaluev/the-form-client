import { observer } from 'mobx-react';
import { Fragment, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { IMaterialDTO } from '@model/entities/material';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useMaterialItemStore } from '@store/modules/entities/material/item/useMaterialItemStore';
import { ROUTES } from '@settings/routes';
import { DialogDiscard } from '@ui/dialogs/dialogDiscard';
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
  const [isOpenDiscard, setIsOpenDiscard] = useState<boolean>(false);
  const handleDiscard = async () => {
    reset();
    setTimeout(() => {
      router.push({
        pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
        query: { ...router.query, slug: [blockId, tab] },
      });
    });
  };
  const handleDiscardClose = () => setIsOpenDiscard(false);
  const handleDiscardOpen = async () => {
    if (isDirty) {
      setIsOpenDiscard(true);
    } else {
      await handleDiscard();
    }
  };
  const handleDiscardConfirm = async () => {
    reset();
  };
  const handleSave = () => {
    return new Promise<void>((resolve, reject) => {
      handleSubmit(async (data) => {
        const res = await saveModalData(data);
        if (res) {
          await handleDiscard();
          resolve();
        } else {
          reject();
        }
      }, reject)();
    });
  };

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={handleDiscardOpen}
          disabled={isSaveLoading}
          variant="outlined"
          color="primary"
        >
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
      <DialogDiscard open={isOpenDiscard} onClose={handleDiscardClose} onDiscard={handleDiscard} />
      <Prompt onDiscard={handleDiscardConfirm} onSave={handleSave} />
    </Fragment>
  );
});
