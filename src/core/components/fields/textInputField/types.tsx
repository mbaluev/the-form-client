import { TextFieldProps } from '@mui/material';
import { ReactElement } from 'react';

export type TextInputFieldType = 'text' | 'number' | 'currency' | 'pattern';

export type TextInputFieldProps = Omit<TextFieldProps, 'value'> & {
  value?: string | number;
  inputType?: TextInputFieldType;
  adornment?: ReactElement | string;
};
