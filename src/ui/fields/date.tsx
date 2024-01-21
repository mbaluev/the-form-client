import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePickerFieldProps } from '@components/fields/datePickerField/types';
import { DatePickerField } from '@components/fields/datePickerField';

interface IProps extends DatePickerFieldProps<any> {
  name: string;
  rules?: any;
}

export const Date = (props: IProps) => {
  const { name, rules, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePickerField
          value={value ? moment(value as string) : null}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          {...otherProps}
        />
      )}
    />
  );
};
