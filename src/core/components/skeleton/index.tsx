import React from 'react';
import { classNames } from '@utils/classNames';
import { SkeletonProps, Skeleton as SkeletonMui } from '@mui/material';
import './index.scss';

export const Skeleton = (props: SkeletonProps) => {
  const { className, ...other } = props;
  const cls = classNames('skeleton', className);
  return <SkeletonMui className={cls} {...other} />;
};
