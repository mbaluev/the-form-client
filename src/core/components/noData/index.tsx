import React from 'react';
import { Button, IButtonProps } from '../button';
import { classNames } from '@utils/classNames';
import './index.scss';

export type TNoDataOrientation = 'column' | 'row';

interface IProps {
  orientation?: TNoDataOrientation;
  icon?: JSX.Element;
  iconClassName?: string;
  message?: string | JSX.Element;
  messageClassName?: string;
  button?: IButtonProps;
}

export const NoData = (props: IProps) => {
  const {
    orientation = 'column',
    icon,
    iconClassName,
    message = 'No data found',
    messageClassName,
    button,
  } = props;

  const mainClassNames = classNames('no-data', `no-data_${orientation}`);
  const iconClassNames = classNames('no-data__icon', iconClassName);
  const messageClassNames = classNames('no-data__message', messageClassName);

  return (
    <div className={mainClassNames}>
      {icon && <div className={iconClassNames}>{icon}</div>}
      {message && <div className={messageClassNames}>{message}</div>}
      {button ? <Button {...button} /> : null}
    </div>
  );
};
