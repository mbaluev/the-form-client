import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { Button } from '@mui/material';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';

export const Actions = observer(() => {
  const { isModalLoading, hasModalErrors, hasModalChanges, saveModalData, validateModal } =
    useUserItemStore();

  const router = useRouter();
  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_USERS.path,
    });
  };
  const handleDoSave = async () => {
    const user = await saveModalData();
    if (user?.id) {
      await router.push({
        pathname: ROUTES.ADMIN_SETTINGS_USER.path,
        query: { id: user.id },
      });
    }
  };
  const handleSave = async () => {
    const isValid = validateModal();
    if (isValid) await handleDoSave();
  };

  return (
    <Fragment>
      <Button onClick={handleClose} variant="outlined" color="primary" disabled={isModalLoading}>
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        variant="contained"
        color="primary"
        disabled={isModalLoading || hasModalErrors || !hasModalChanges}
      >
        Create
      </Button>
    </Fragment>
  );
});
