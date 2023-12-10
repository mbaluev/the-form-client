import { SwitchProps } from '@mui/material';
import { ReactNode } from 'react';

export type SwitchFieldProps = Omit<SwitchProps, 'value'> & {
  label?: string | ReactNode;
  value?: boolean;
  error?: boolean;
  helperText?: string | null;
};
