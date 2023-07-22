import { Alert as MuiAlert, AlertColor, AlertTitle } from '@mui/material';
import { forwardRef } from 'react';
import { VariantType } from 'notistack';
import { classNames } from '@utils/classNames';
import { AlertProps } from '@mui/material/Alert/Alert';
import './index.scss';

export interface IAlertProps {
  type?: VariantType;
  icon?: JSX.Element;
  title?: string;
  message?: string;
  shadow?: boolean;
  border?: boolean;
  variant?: AlertProps['variant'];
  onClose?: AlertProps['onClose'];
}

export const Alert = forwardRef<HTMLDivElement, IAlertProps>((props, ref) => {
  const {
    type,
    icon,
    title,
    message,
    shadow = true,
    border = true,
    variant = 'filled',
    onClose,
  } = props;
  const cls = classNames('alert', {
    alert_border: Boolean(border),
    alert_shadow: Boolean(shadow),
    alert_message: Boolean(message),
  });
  return (
    <MuiAlert
      className={cls}
      severity={type as AlertColor}
      icon={icon}
      ref={ref}
      variant={variant}
      onClose={onClose}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message && <AlertTitle>{message}</AlertTitle>}
    </MuiAlert>
  );
});
