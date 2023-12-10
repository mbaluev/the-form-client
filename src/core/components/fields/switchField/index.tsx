import { ChangeEvent, useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { SwitchFieldProps } from '@components/fields/switchField/types';
import { Switch } from '@components/fields/switchField/switch';

export const SwitchField = (props: SwitchFieldProps) => {
  const { className, value = false, onChange, label, error, helperText, sx, ...other } = props;

  const [state, setState] = useState<boolean>(value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
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
        control={<Switch checked={state} onChange={handleChange} {...other} />}
        label={label}
      />
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
