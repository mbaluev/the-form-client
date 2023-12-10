import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { SwitchField } from 'core/components/fields/switchField';
import { SwitchFieldProps } from '@components/fields/switchField/types';

interface IProps extends SwitchFieldProps {
  rules?: any;
}

export const Switch = <T extends FieldValues>(props: IProps) => {
  const { name, rules, onChange: handleChange, ...otherProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      defaultValue={false as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SwitchField
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
