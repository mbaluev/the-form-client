import { Switch as MuiSwitch } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SwitchProps } from '@mui/material';

export const Switch = styled((props: SwitchProps) => (
  <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  margin: 9,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    color: '#ffffff',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      color: theme.palette.common.white,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.5,
      backgroundColor: theme.palette.t1Grey[100],
      borderColor: theme.palette.t1Grey[100],
    },
    '&.Mui-disabled.Mui-checked ': {
      color: theme.palette.common.white,
    },
    '&.Mui-disabled.Mui-checked + .MuiSwitch-track': {
      opacity: 0.5,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 10,
    opacity: 1,
    backgroundColor: theme.palette.t1Grey[100],
    boxSizing: 'border-box',
  },
}));
