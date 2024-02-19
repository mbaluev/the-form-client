import { Controller, useFormContext } from 'react-hook-form';
import { SelectFieldProps } from '@components/fields/selectField/types';
import { SelectSearchAsyncField } from '@components/fields/selectField/async';

interface IProps extends SelectFieldProps {
  rules?: any;
}

export const SelectSearchAsync = (props: IProps) => {
  const { name, rules, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectSearchAsyncField
          value={value as string}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
};
