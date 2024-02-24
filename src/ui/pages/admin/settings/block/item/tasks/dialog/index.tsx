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
import { useTaskSettingsItemStore } from '@store/modules/settings/task/settings/item/hook';
import { Title } from '@ui/pages/admin/settings/block/item/tasks/dialog/title';
import { Actions } from '@ui/pages/admin/settings/block/item/tasks/dialog/actions';
import { DEFAULT_TASK } from '@model/entities/task/default';
import { Form } from '@ui/pages/admin/settings/block/item/tasks/dialog/form';
import { ITaskDTO } from '@model/entities/task';

interface IProps {
  open?: boolean;
}

export const TaskDialog = observer((props: IProps) => {
  const { open = false } = props;
  const { isSaveLoading, getModalData, modalData, isModalLoading } = useTaskSettingsItemStore();
  const { data: block } = useBlockSettingsItemStore();

  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;
  const taskId = router.query.slug?.[2] as string;
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab] },
    });
  };

  const methods = useForm<ITaskDTO>({ mode: 'all', defaultValues: DEFAULT_TASK });
  useEffect(() => {
    const data: any = modalData ? { ...modalData } : {};
    data.blockId = block?.id;
    methods.reset(data);
  }, [modalData]);
  useEffect(() => {
    if (open) {
      const data: any = {};
      data.blockId = block?.id;
      methods.reset(data);
      getModalData(taskId);
    }
  }, [open, taskId]);

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
