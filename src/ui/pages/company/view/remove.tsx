import { observer } from 'mobx-react';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '@settings/routes';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
  Divider,
  Button,
  Dialog,
} from '@mui/material';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import { useRouter } from 'next/router';

export const DialogRemove = observer(() => {
  const { isRemoving, remove, company, setCompany } = useCompanyViewStore();
  const { t } = useTranslation('company');
  const router = useRouter();
  const open = router.pathname === ROUTES.COMPANY_REMOVE.path;

  const handleClose = async () => {
    await router.push({ pathname: ROUTES.HOME.path });
  };
  const handleRemove = async () => {
    await remove();
    await router.push({ pathname: ROUTES.HOME.path });
    setCompany();
  };

  return (
    <Dialog
      scroll="body"
      open={open}
      maxWidth="sm"
      fullWidth
      sx={{ zIndex: 1340 }}
    >
      <DialogTitle>
        <Stack spacing={1}>
          <Typography fontWeight={600} fontSize="1.1rem">
            {`${t('delete-company')} "${company?.name}" ?`}
          </Typography>
        </Stack>
      </DialogTitle>
      {isRemoving ? (
        <LinearProgress sx={{ borderRadius: 0, height: 2 }} />
      ) : (
        <Divider sx={{ borderWidth: 1 }} />
      )}
      <DialogContent>{t('delete-company-question')}</DialogContent>
      <Divider sx={{ borderWidth: 1 }} />
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          sx={{ flexBasis: '50%' }}
          disabled={isRemoving}
          fullWidth
        >
          {t('common:confirm-no')}
        </Button>
        <Button
          onClick={handleRemove}
          variant="contained"
          color="primary"
          sx={{ flexBasis: '50%' }}
          disabled={isRemoving}
          fullWidth
        >
          {t('common:confirm-yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
