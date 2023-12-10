import { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { Menu } from '@ui/layout/navigation/menu';
import { Notifier } from '@ui/layout/notifier';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

export const Navigation = () => {
  return (
    <Fragment>
      <CssBaseline />
      <AppBar id="__header" elevation={0}>
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
