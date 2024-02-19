import { SelectProps } from '@mui/material';
import { ReactElement } from 'react';

export interface ISelectItem {
  id?: number | string | null;
  value?: number | string | null;
  label?: string | ReactElement | null;
  disabled?: boolean;
}

export type SelectFieldProps = SelectProps & {
  items?: ISelectItem[];
  helperText?: string | null;
  highlightInput?: boolean;
  highlightValue?: boolean;
  loadItems?: () => Promise<ISelectItem[] | undefined>;
};

export type SelectFreeTextFieldProps = Omit<SelectFieldProps, 'items'> & {
  items?: string[];
};
