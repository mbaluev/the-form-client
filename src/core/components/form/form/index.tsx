import React, { FC } from 'react';
import { classNames } from '@utils/classNames';
import './index.scss';

export interface IFormProps {
  className?: string;
  style?: Record<any, any>;
  cols?: number;
}

export const Form: FC<IFormProps> = (props) => {
  const { className, style, cols, children } = props;
  const cls = classNames('form', className, {
    [`cols_${cols}`]: Boolean(cols),
  });
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};
