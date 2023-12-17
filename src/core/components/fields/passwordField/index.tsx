import { MouseEvent, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { TextInputFieldProps } from '@components/fields/textInputField/types';
import { TextInputField } from '@components/fields/textInputField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordField = (props: TextInputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextInputField
      {...props}
      type={showPassword && !props.disabled ? 'text' : 'password'}
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
    />
  );
};
