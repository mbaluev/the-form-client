import React from 'react';
import { classNames } from '@utils/classNames';
import { Skeleton } from '@components/skeleton';

interface IProps {
  className?: string;
}
export const SkeletonFieldControl = (props: IProps) => {
  const { className } = props;
  const cls = classNames('skeleton-field-control', 'field-control', className);
  return (
    <div className={cls}>
      <Skeleton />
    </div>
  );
};
