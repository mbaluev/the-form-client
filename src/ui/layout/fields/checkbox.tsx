import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { CheckboxField } from 'core/components/fields/checkboxField';
import { CheckboxFieldProps } from '@components/fields/checkboxField/types';

interface IProps extends CheckboxFieldProps {
  rules?: any;
}

export const Checkbox = <T extends FieldValues>(props: IProps) => {
  const { name, rules, onChange: handleChange, ...otherProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      defaultValue={false as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CheckboxField
          name={name}
          value={value as any}
          onChange={(e, checked) => {
            onChange(e);
            if (handleChange) handleChange(e, checked);
          }}
          checked={value as any}
          error={!!error}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
};
