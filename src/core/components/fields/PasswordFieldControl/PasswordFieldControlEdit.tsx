import React, { useState, MouseEvent } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import {
  PasswordFieldControlProps,
  isTextFieldControlHasData,
} from '@components/fields';

export const PasswordFieldControlEdit = (props: PasswordFieldControlProps) => {
  const {
    className,
    type,
    variant,
    value,
    onChange,
    InputProps,
    disabled,
    size,
    ...other
  } = props;

  const [state, setState] = useState<string | undefined>(value);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const cls = classNames(className, {
    'field-control_no-data': !isTextFieldControlHasData(state),
  });

  return (
    <TextField
      className={cls}
      disabled={disabled}
      type={showPassword && !disabled ? 'text' : 'password'}
      variant="outlined"
      value={state || ''}
      onChange={(e) => {
        setState(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <Visibility className="color-light-blue" />
              ) : (
                <VisibilityOff className="color-actions-no-active" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
};
