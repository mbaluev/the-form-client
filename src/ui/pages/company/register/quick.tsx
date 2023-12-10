import { Button } from '@theme/button';
import { useTranslation } from 'next-i18next';
import { Fragment, useEffect, useState } from 'react';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { DialogDiscard } from '@ui/dialogs/dialogDiscard';
import { observer } from 'mobx-react';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { ICompanyViewDTO } from '@model/onboard/company';
import { DefaultCompany } from '@model/onboard/company/mock';
import { useCompanyRegisterStore } from '@store/modules/onboard/company/register/useCompanyRegisterStore';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';

export const Quick = observer(() => {
  const { init } = useCompanyViewStore();
  const { isLoading, register } = useCompanyRegisterStore();
  const { add } = useNotifyStore();
  const { t } = useTranslation('company');
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext<ICompanyViewDTO>();

  const [back, setBack] = useState<boolean>(false);
  useEffect(() => {
    if (back) {
      router.push({ pathname: ROUTES.HOME.path });
    }
    setBack(false);
  }, [back]);

  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (success) {
      router.push({ pathname: ROUTES.HOME.path }).then(async () => {
        await init();
        add(t('success-register'), 'success');
      });
    }
    setSuccess(false);
  }, [success]);

  // unsaved changes
  const { Prompt } = useUnsavedChanges(isDirty);
  const [isOpenDiscard, setIsOpenDiscard] = useState<boolean>(false);
  const handleDiscard = async () => {
    reset(DefaultCompany);
    setBack(true);
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
    reset(DefaultCompany);
  };
  // save
  const handleSave = handleSubmit(async (data: ICompanyViewDTO) => {
    try {
      const newData = JSON.parse(JSON.stringify(data));
      await register(data);
      reset(newData);
      setSuccess(true);
    } catch (err) {}
  });

  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        <Button
          variant="text"
          startIcon={<CloseIcon />}
          onClick={handleDiscardOpen}
          disabled={isLoading}
        >
          {t('common:discard')}
        </Button>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={handleSave}
          disabled={isLoading || !isDirty}
        >
          {t('common:submit')}
        </Button>
      </Stack>
      <DialogDiscard
        open={isOpenDiscard}
        onClose={handleDiscardClose}
        onDiscard={handleDiscard}
      />
      <Prompt onDiscard={handleDiscardConfirm} onSave={handleSave} />
    </Fragment>
  );
});
