import React, { FC } from 'react';
import { classNames } from '@utils/classNames';
import { IContentItemProps } from '@components/content';
import './index.scss';

export const ContentPanel: FC<IContentItemProps> = (props) => {
  const { id, className, children } = props;
  const cls = classNames('content__panel', className);
  return (
    <div className={cls} id={id}>
      {children}
    </div>
  );
};
