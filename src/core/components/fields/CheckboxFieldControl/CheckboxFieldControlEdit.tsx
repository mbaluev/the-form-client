import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { CheckboxFieldControlProps } from '@components/fields';

export const CheckboxFieldControlEdit = (props: CheckboxFieldControlProps) => {
  const { className, value = false, onChange, label, error, helperText, size, ...other } = props;

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
          <Checkbox
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
      />
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
