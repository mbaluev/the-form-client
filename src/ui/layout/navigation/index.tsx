import { Fragment, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { Menu } from '@ui/layout/navigation/menu';
import { Notifier } from '@ui/layout/notifier';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useElementSize } from 'usehooks-ts';
import { useAppStore } from '@store/modules/common/app/useAppStore';

export const Navigation = () => {
  const [ref, { height }] = useElementSize();
  const { setNavHeight } = useAppStore();
  useEffect(() => {
    setNavHeight(height);
  }, [height]);

  return (
    <Fragment>
      <CssBaseline />
      <AppBar id="__header" elevation={0} ref={ref}>
        <Menu />
        <Notifier />
      </AppBar>
      <Stack sx={{ visibility: 'hidden' }}>
        <Toolbar />
        <Notifier />
      </Stack>
    </Fragment>
  );
};
