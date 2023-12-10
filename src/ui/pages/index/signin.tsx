import { observer } from 'mobx-react';
import NoData from '@components/noData';
import { useTranslation } from 'next-i18next';
import IconSignIn from '@components/svg/icons/components/signIn';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

export const SignIn = observer(() => {
  const { t } = useTranslation('company');

  const { signIn } = useAuthStore();
  const handleSignIn = () => signIn();

  return (
    <NoData
      marginTop={20}
      icon={<IconSignIn />}
      message={t('title-sign-in')}
      button={{
        variant: 'outlined',
        onClick: handleSignIn,
        children: t('menu:acc-sign-in'),
        startIcon: <IconSignIn />,
      }}
    />
  );
});
