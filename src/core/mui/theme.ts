import { NextRouter } from 'next/router';
import { createTheme, Direction } from '@mui/material/styles';
import dirs from '@utils/locale/dir';

export const theme = (router?: NextRouter) => {
  return createTheme({
    spacing: 5,
    direction: dirs.getDir(router?.locale) as Direction,
    typography: {
      fontFamily: '"Roboto Mono", "Roboto", "Montserrat", sans-serif',
      button: { fontWeight: '500' },
    },
  });
};
