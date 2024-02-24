import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from '@settings/routes';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/settings/item/hook';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { useQuestionSettingsItemStore } from '@store/modules/settings/question/settings/item/hook';
import { Title } from '@ui/pages/admin/settings/block/item/questions/dialog/title';
import { Actions } from '@ui/pages/admin/settings/block/item/questions/dialog/actions';
import { DEFAULT_QUESTION } from '@model/entities/question/default';
import { Form } from '@ui/pages/admin/settings/block/item/questions/dialog/form';
import { IQuestionDTO } from '@model/entities/question';

interface IProps {
  open?: boolean;
}

export const QuestionDialog = observer((props: IProps) => {
  const { open = false } = props;
  const { isSaveLoading, getModalData, modalData, isModalLoading } = useQuestionSettingsItemStore();
  const { data: block } = useBlockSettingsItemStore();

  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;
  const questionId = router.query.slug?.[2] as string;
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab] },
    });
  };

  const methods = useForm<IQuestionDTO>({ mode: 'all', defaultValues: DEFAULT_QUESTION });
  useEffect(() => {
    const data: any = modalData ? { ...modalData } : {};
    data.blockId = block?.id;
    methods.reset(data);
  }, [modalData]);
  useEffect(() => {
    if (open) {
      const data: any = DEFAULT_QUESTION;
      data.blockId = block?.id;
      methods.reset(data);
      getModalData(questionId);
    }
  }, [open, questionId]);

  return (
    <FormProvider {...methods}>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ p: 2 }}>
          <Title onClose={handleClose} />
        </DialogTitle>
        {isSaveLoading ? <ProgressBase sx={{ borderRadius: 0 }} /> : <SeparatorBase />}
        <DialogContent>{isModalLoading ? <TabSkeleton /> : <Form />}</DialogContent>
        <SeparatorBase />
        <DialogActions>
          <Actions />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
});
