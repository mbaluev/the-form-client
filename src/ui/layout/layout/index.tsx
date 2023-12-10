import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { DialogSessionExpired } from '@ui/dialogs/dialogSessionExpired';
import { Navigation } from '@ui/layout/navigation';
import Stack from '@mui/material/Stack';

export const Layout = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { currentAccount, signOut, signIn } = useAuthStore();
  return (
    <Stack height="100%" id="__layout">
      <Navigation />
      {children}
      <DialogSessionExpired
        open={currentAccount?.expired}
        onLogin={signIn}
        onLogout={signOut}
      />
    </Stack>
  );
});
