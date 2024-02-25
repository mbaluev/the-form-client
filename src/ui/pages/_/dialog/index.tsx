import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useUserSettingsItemStore } from '@store/modules/settings/user/item/hook';
import { Title } from '@ui/pages/_/dialog/title';
import { ROUTES } from '@settings/routes';
import { Content } from '@ui/pages/_/dialog/content';
import { Actions } from '@ui/pages/_/dialog/actions';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useEffect } from 'react';

interface IProps {
  open?: boolean;
}

export const UserDialog = observer((props: IProps) => {
  const { open = false } = props;
  const { isModalLoading, setModalData } = useUserSettingsItemStore();

  const router = useRouter();
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_USERS.path,
    });
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
