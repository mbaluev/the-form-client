import { ChangeEvent, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { CheckboxFieldProps } from '@components/fields/checkboxField/types';

export const CheckboxField = (props: CheckboxFieldProps) => {
  const {
    className,
    value = false,
    onChange,
    label,
    error,
    helperText,
    sx,
    ...other
  } = props;

  const [state, setState] = useState<boolean>(value);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setState(checked);
    if (onChange) onChange(event, checked);
  };

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormControl sx={sx}>
      <FormControlLabel
        sx={{
          mr: 0,
          display: 'flex',
          '& .MuiFormControlLabel-label': { flexGrow: 1, overflow: 'hidden' },
        }}
        control={
          <Checkbox checked={state} onChange={handleChange} {...other} />
        }
        label={label}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
