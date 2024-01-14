import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { isTextFieldControlHasData, TextFieldControlProps, inputProps } from '@components/fields';

export const TextFieldControlEdit = (props: TextFieldControlProps) => {
  const {
    className,
    variant,
    value,
    onChange,
    multiline,
    inputType = 'text',
    adornment,
    size,
    ...other
  } = props;

  const [state, setState] = useState<string | number | undefined>(value);

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const cls = classNames(className, {
    'field-control_no-data': !isTextFieldControlHasData(state),
  });

  return (
    <TextField
      className={cls}
      variant="outlined"
      value={state || ''}
      multiline={multiline}
      onChange={(e) => {
        setState(e.target.value);
        if (onChange) onChange(e);
      }}
      inputProps={{ autoComplete: 'off' }}
      InputProps={inputProps(value, inputType, adornment)}
      {...other}
    />
  );
};
