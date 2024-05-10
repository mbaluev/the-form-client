import { Controller, useFormContext } from 'react-hook-form';
import { SelectFieldProps } from '@components/fields/selectField/types';
import { SelectField } from '@components/fields/selectField';

interface IProps extends SelectFieldProps {
  rules?: any;
}

export const Select = (props: IProps) => {
  const { name, items, rules, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectField
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
