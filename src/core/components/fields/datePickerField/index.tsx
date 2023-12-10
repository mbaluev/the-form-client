import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePickerFieldProps } from '@components/fields/datePickerField/types';
import 'moment/min/locales';

export const DatePickerField = <TDate,>(props: DatePickerFieldProps<TDate>) => {
  const { locale, error, helperText, ...otherProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <DatePicker
        slotProps={{
          textField: { size: 'small', error, helperText },
          desktopPaper: { elevation: 2, sx: { mt: 1 } },
        }}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};
