import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from '@settings/routes';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/item/hook';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { useMaterialSettingsItemStore } from '@store/modules/settings/material/item/hook';
import { Title } from '@ui/pages/admin/settings/block/item/materials/dialog/title';
import { Actions } from '@ui/pages/admin/settings/block/item/materials/dialog/actions';
import { DEFAULT_MATERIAL } from '@model/entities/material/default';
import { Form } from '@ui/pages/admin/settings/block/item/materials/dialog/form';
import { IMaterialDTO } from '@model/entities/material';

interface IProps {
  open?: boolean;
}

export const MaterialDialog = observer((props: IProps) => {
  const { open = false } = props;
  const { isSaveLoading, getModalData, modalData, isModalLoading } = useMaterialSettingsItemStore();
  const { data: block } = useBlockSettingsItemStore();

  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;
  const materialId = router.query.slug?.[2] as string;
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab] },
    });
  };

  const methods = useForm<IMaterialDTO>({ mode: 'all', defaultValues: DEFAULT_MATERIAL });
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
      getModalData(materialId);
    }
  }, [open, materialId]);

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
