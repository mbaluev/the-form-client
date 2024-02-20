import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from '@settings/routes';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useMaterialItemStore } from '@store/modules/entities/material/item/useMaterialItemStore';
import { Title } from '@ui/pages/admin/settings/block/item/materials/dialog/title';
import { Content } from '@ui/pages/admin/settings/block/item/materials/dialog/content';
import { Actions } from '@ui/pages/admin/settings/block/item/materials/dialog/actions';
import { FormProvider, useForm } from 'react-hook-form';
import { IMaterialDTO } from '@model/entities/material';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';

interface IProps {
  open?: boolean;
}

export const MaterialDialog = observer((props: IProps) => {
  const { open = false } = props;
  const { isModalLoading, getModalData, modalData } = useMaterialItemStore();
  const { data: block } = useBlockItemStore();

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

  const methods = useForm<IMaterialDTO>({ mode: 'all', defaultValues: {} });
  useEffect(() => {
    const data: any = modalData ? { ...modalData } : {};
    data.block = block;
    data.blockId = block?.id;
    methods.reset(data);
  }, [modalData]);
  useEffect(() => {
    if (open) {
      const data: any = {};
      data.block = block;
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
        {isModalLoading ? <ProgressBase sx={{ borderRadius: 0 }} /> : <SeparatorBase />}
        <DialogContent>
          <Content />
        </DialogContent>
        <SeparatorBase />
        <DialogActions>
          <Actions />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
});
