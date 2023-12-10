import { observer } from 'mobx-react';
import NoData from '@components/noData';
import { useTranslation } from 'next-i18next';
import IconSignIn from '@components/svg/icons/components/signIn';

export const SignIn = observer(() => {
  const { t } = useTranslation('company');

  const handleSignIn = () => {};

  return (
    <NoData
      marginTop={20}
      icon={<IconSignIn />}
      message={t('menu:nav-home')}
      button={{
        variant: 'outlined',
        onClick: handleSignIn,
        children: t('menu:acc-sign-in'),
        startIcon: <IconSignIn />,
      }}
    />
  );
});
