import React from 'react';
import { Button, IButtonProps } from '@components/button';
import { classNames } from '@utils/classNames';
import './index.scss';
import { Stack } from '@mui/material';

interface IErrorPageProps {
  icon?: JSX.Element;
  code?: string;
  message?: string;
  buttons?: IButtonProps[];
  className?: string;
}

export const ErrorPage = (props: IErrorPageProps) => {
  const { icon, code, message, buttons, className } = props;
  const cls = classNames('error-page', className);
  return (
    <div className={cls}>
      <div className="error-page__content">
        {icon && <div className="error-page__icon">{icon}</div>}
        {code && <div className="error-page__code">{code}</div>}
        {message && <div className="error-page__message">{message}</div>}
        {buttons && (
          <Stack spacing="15px">
            {buttons.map((button, index) => (
              <Button key={index} className="error-page__button" {...button} />
            ))}
          </Stack>
        )}
      </div>
    </div>
  );
};
