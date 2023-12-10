import { observer } from 'mobx-react';
import NoData from '@components/noData';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import CheckIcon from '@mui/icons-material/Check';

export const Welcome = observer(() => {
  const { t } = useTranslation('company');

  const router = useRouter();
  const handleRegister = async () => {
    await router.push({
      pathname: ROUTES.COMPANY_REGISTER.path,
    });
  };

  return (
    <NoData
      marginTop={20}
      icon={<CheckIcon />}
      message={t('title-welcome')}
      button={{
        variant: 'outlined',
        onClick: handleRegister,
        children: t('btn-register'),
      }}
    />
  );
});
