import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { SelectFieldProps } from '@components/fields/selectField/types';
import { SelectSearchField } from '@components/fields/selectField/search';

interface IProps extends SelectFieldProps {
  rules?: any;
}

export const SelectSearch = <T extends FieldValues>(props: IProps) => {
  const { name, items, rules, ...otherProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectSearchField
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
