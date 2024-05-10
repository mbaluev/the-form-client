import { Controller, useFormContext } from 'react-hook-form';
import { SwitchFieldProps } from '@components/fields/switchField/types';
import { SwitchField } from '@components/fields/switchField';

interface IProps extends SwitchFieldProps {
  rules?: any;
}

export const Switch = (props: IProps) => {
  const { name, rules, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      defaultValue={false}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SwitchField
          name={name}
          value={value as any}
          onChange={onChange}
          checked={value as any}
          error={!!error}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
};
