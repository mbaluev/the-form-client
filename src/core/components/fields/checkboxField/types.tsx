import { CheckboxProps } from '@mui/material';
import { ReactNode } from 'react';

export type CheckboxFieldProps = Omit<CheckboxProps, 'value'> & {
  label?: string | ReactNode;
  value?: boolean;
  error?: boolean;
  helperText?: string | null;
};
