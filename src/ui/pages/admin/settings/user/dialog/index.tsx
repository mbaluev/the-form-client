import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { Title } from '@ui/pages/admin/settings/user/dialog/title';
import { Content } from '@ui/pages/admin/settings/user/dialog/content';
import { Actions } from '@ui/pages/admin/settings/user/dialog/actions';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useEffect } from 'react';

interface IProps {
  open?: boolean;
}

export const UserDialog = observer((props: IProps) => {
  const { open = false } = props;
  const { isModalLoading, setModalData } = useUserItemStore();

  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  useEffect(() => {
    setModalData();
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>
        <Title />
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
  );
});
