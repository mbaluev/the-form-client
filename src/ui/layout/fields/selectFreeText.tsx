import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { SelectFreeTextFieldProps } from '@components/fields/selectField/types';
import SelectFreeTextField from '@components/fields/selectField/freeText';

interface IProps extends SelectFreeTextFieldProps {
  rules?: any;
}

export const SelectFreeText = <T extends FieldValues>(props: IProps) => {
  const { name, items, rules, ...otherProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectFreeTextField
          value={value as string}
          onChange={onChange}
          error={!!error}
          items={items}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
};
