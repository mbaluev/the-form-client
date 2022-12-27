import React from 'react';
import { Switch as MuiSwitch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Switch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(() => ({
  width: 40,
  height: 24,
  padding: 0,
  margin: 8,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    color: '#ffffff',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#167dff',
      borderColor: '#167dff',
    },
    '&.Mui-disabled': {
      color: '#ffffff',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.5,
      backgroundColor: '#a9a9b1',
      borderColor: '#a9a9b1',
    },
    '&.Mui-disabled.Mui-checked ': {
      color: '#ffffff',
    },
    '&.Mui-disabled.Mui-checked + .MuiSwitch-track': {
      opacity: 0.5,
      backgroundColor: '#167dff',
      borderColor: '#167dff',
    },
  },
  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: '#a9a9b1',
    boxSizing: 'border-box',
  },
}));
