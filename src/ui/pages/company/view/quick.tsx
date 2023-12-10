import { Button } from '@theme/button';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import IconTrash from '@components/svg/icons/components/trash';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { Fragment } from 'react';
import { DialogRemove } from '@ui/pages/company/view/remove';

export const Quick = observer(() => {
  const { isRemoving, company } = useCompanyViewStore();
  const { t } = useTranslation('company');
  const router = useRouter();

  const handleRemove = async () => {
    await router.push({ pathname: ROUTES.COMPANY_REMOVE.path });
  };

  if (!company) return null;

  return (
    <Fragment>
      <Button
        variant="text"
        color="error"
        startIcon={<IconTrash />}
        onClick={handleRemove}
        disabled={isRemoving}
      >
        {t('common:delete')}
      </Button>
      <DialogRemove />
    </Fragment>
  );
});
