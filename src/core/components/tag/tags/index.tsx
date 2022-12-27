import React, { FC } from 'react';
import { classNames } from '@utils/classNames';
import './index.scss';

export type ITagsProps = {
  className?: string;
};

export const Tags: FC<ITagsProps> = (props) => {
  const { className, children } = props;
  const cls = classNames('tags', className);
  return <div className={cls}>{children}</div>;
};
