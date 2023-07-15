import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { RadioGroupFieldControlProps } from '@components/fields';

export const RadioGroupFieldControlEdit = (
  props: RadioGroupFieldControlProps
) => {
  const {
    className,
    value,
    onChange,
    error,
    helperText,
    items,
    disabled,
    layout = 'vertical',
    size,
    ...other
  } = props;

  const [state, setState] = useState<string>(value || '');

  const cls = classNames(className, `radio-group-field-control_${layout}`, {
    'field-control_no-data': !state,
  });

  useUpdateEffect(() => {
    setState(value || '');
  }, [value]);

  return (
    <FormControl className={cls} component="fieldset">
      <RadioGroup
        value={state}
        onChange={(e: React.ChangeEvent<HTMLInputElement>, onChangeValue) => {
          setState(e.target.value);
          if (onChange) {
            onChange(e, onChangeValue);
          }
        }}
        {...other}
      >
        {items?.map((item, index) => {
          return (
            <FormControlLabel
              key={index}
              value={item.value}
              control={<Radio color="primary" />}
              label={item.label}
              disabled={disabled}
            />
          );
        })}
      </RadioGroup>
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
