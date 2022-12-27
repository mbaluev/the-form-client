import React from 'react';
import { Button, IButtonProps } from '@components/button';
import './index.scss';
import { classNames } from '@utils/classNames';

interface IErrorPageProps {
  icon?: JSX.Element;
  code?: string;
  description?: string;
  button?: IButtonProps;
  className?: string;
}

export const ErrorPage = (props: IErrorPageProps) => {
  const { icon, code, description, button, className } = props;
  const cls = classNames('error-page', className);
  return (
    <div className={cls}>
      <div className="error-page__content">
        {icon && <div className="error-page__icon">{icon}</div>}
        {code && <div className="error-page__code">{code}</div>}
        {description && (
          <div className="error-page__description">{description}</div>
        )}
        {button && <Button className="error-page__button" {...button} />}
      </div>
    </div>
  );
};
