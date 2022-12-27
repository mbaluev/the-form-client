import { Alert as MuiAlert, AlertColor, AlertTitle } from '@mui/material';
import { forwardRef } from 'react';
import { VariantType } from 'notistack';
import { classNames } from '@utils/classNames';
import { AlertProps } from '@mui/material/Alert/Alert';
import './index.scss';

export interface IAlertProps {
  type?: VariantType;
  title?: string;
  message: string;
  shadow?: boolean;
  variant?: AlertProps['variant'];
}

export const Alert = forwardRef<HTMLDivElement, IAlertProps>((props, ref) => {
  const { type, title, message, shadow = true, variant = 'filled' } = props;
  const cls = classNames('alert', {
    alert_shadow: Boolean(shadow),
  });
  return (
    <MuiAlert
      className={cls}
      severity={type as AlertColor}
      ref={ref}
      variant={variant}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </MuiAlert>
  );
});
