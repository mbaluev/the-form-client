import { observer } from 'mobx-react';
import NoData from '@components/noData';
import IconSignIn from '@components/svg/icons/components/signIn';

export const SignIn = observer(() => {
  const handleSignIn = () => {};

  return (
    <NoData
      marginTop={20}
      icon={<IconSignIn />}
      message="The Form"
      button={{
        variant: 'outlined',
        onClick: handleSignIn,
        children: 'Sign in',
        startIcon: <IconSignIn />,
      }}
    />
  );
});
