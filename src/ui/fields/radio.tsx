import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText, RadioGroup, RadioGroupProps } from '@mui/material';

interface IProps extends RadioGroupProps {
  rules?: any;
}

export const RadioField = (props: IProps) => {
  const { name, rules, children, ...otherProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      defaultValue={false}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <RadioGroup name={name} value={value} onChange={onChange} {...otherProps}>
            {children}
          </RadioGroup>
          {error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
