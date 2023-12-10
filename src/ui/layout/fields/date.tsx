import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { DatePickerFieldProps } from '@components/fields/datePickerField/types';
import { DatePickerField } from 'core/components/fields/datePickerField';
import moment from 'moment';

interface IProps extends DatePickerFieldProps<any> {
  name: string;
  rules?: any;
}

export const Date = <T extends FieldValues>(props: IProps) => {
  const { name, rules, ...otherProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
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
