import { DateTimePickerProps } from '@mui/x-date-pickers';

export type DateTimePickerFieldProps<TDate> = DateTimePickerProps<TDate> & {
  locale?: string;
};
