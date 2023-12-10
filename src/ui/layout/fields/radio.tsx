import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';

interface IProps extends RadioGroupProps {
  rules?: any;
}

export const RadioField = <T extends FieldValues>(props: IProps) => {
  const { name, rules, children, ...otherProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      defaultValue={false as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <RadioGroup
            name={name}
            value={value}
            onChange={onChange}
            {...otherProps}
          >
            {children}
          </RadioGroup>
          {error && (
            <FormHelperText error={!!error}>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
