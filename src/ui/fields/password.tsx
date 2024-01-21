import { Controller, useFormContext } from 'react-hook-form';
import { TextInputFieldProps } from '@components/fields/textInputField/types';
import { PasswordField } from '@components/fields/passwordField';

interface IProps extends TextInputFieldProps {
  rules?: any;
  loading?: boolean;
}

export const Password = (props: IProps) => {
  const { name, rules, loading, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PasswordField
          value={value as string}
          onChange={onChange}
          error={!!error}
          inputProps={{ autoComplete: 'new-password' }}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
};
