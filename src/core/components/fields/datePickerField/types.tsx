import { DatePickerProps } from '@mui/x-date-pickers';

export type DatePickerFieldProps<TDate> = DatePickerProps<TDate> & {
  locale?: string;
  error?: boolean;
  helperText?: string | null;
  name?: string;
};
