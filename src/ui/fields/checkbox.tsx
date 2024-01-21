import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxFieldProps } from '@components/fields/checkboxField/types';
import { CheckboxField } from '@components/fields/checkboxField';

interface IProps extends CheckboxFieldProps {
  rules?: any;
}

export const Checkbox = (props: IProps) => {
  const { name, rules, onChange: handleChange, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      defaultValue={false}
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
