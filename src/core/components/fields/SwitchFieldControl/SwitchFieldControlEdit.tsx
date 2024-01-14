import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { SwitchFieldControlProps, Switch } from '@components/fields';

export const SwitchFieldControlEdit = (props: SwitchFieldControlProps) => {
  const {
    className,
    value = false,
    onChange,
    label,
    error,
    helperText,
    labelPlacement,
    size,
    ...other
  } = props;

  const [state, setState] = useState<boolean>(value);

  const cls = classNames(className, {
    'field-control_no-data': typeof state === 'undefined',
  });

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormControl className={cls}>
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={(e, checked) => {
              setState(e.target.checked);
              if (onChange) {
                onChange(e, checked);
              }
            }}
            {...other}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
