import React, { Ref } from 'react';
import { classNames } from '@utils/classNames';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import './index.scss';

export type TButtonColorTypes =
  | 'blue'
  | 'grey'
  | 'grey-light'
  | 'orange'
  | 'red'
  | 'green';
export type TButtonSizeTypes =
  | 'default'
  | 'big'
  | 'medium'
  | 'small'
  | 'x-small';

export type IButtonProps = Omit<MuiButtonProps, 'color' | 'size'> & {
  color?: TButtonColorTypes;
  size?: TButtonSizeTypes;
  iconButton?: boolean;
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IButtonProps>
>((props, ref: Ref<HTMLButtonElement>) => {
  const {
    onClick,
    className = '',
    children,
    variant = 'contained',
    color = 'blue',
    size = 'default',
    iconButton,
    ...other
  } = props;

  const cls = classNames('button', {
    [`${className}`]: !!className,
    [`button_size_${size}`]: !!size,
    [`button_color_${color}`]: !!color,
    button_icon: !!iconButton,
  });

  return (
    <MuiButton
      ref={ref}
      onClick={onClick}
      className={cls}
      variant={variant}
      {...other}
    >
      {typeof children === 'string' ? (
        <div className="button-text">{children}</div>
      ) : (
        children
      )}
    </MuiButton>
  );
});
