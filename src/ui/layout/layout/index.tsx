import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Navigation } from '@ui/layout/navigation';
import Stack from '@mui/material/Stack';

export const Layout = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  return (
    <Stack height="100%" id="__layout">
      <Navigation />
      {children}
    </Stack>
  );
});
