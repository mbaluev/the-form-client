import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePickerFieldProps } from '@components/fields/dateTimePickerField/types';
import 'moment/min/locales';

export const DateTimePickerField = <TDate,>(
  props: DateTimePickerFieldProps<TDate>
) => {
  const { locale, ...otherProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <DateTimePicker
        slotProps={{
          textField: { size: 'small' },
          desktopPaper: { elevation: 2, sx: { mt: 1 } },
        }}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};
