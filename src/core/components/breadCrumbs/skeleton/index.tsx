import React from 'react';
import { classNames } from '@utils/classNames';
import { Skeleton } from '@components/skeleton';
import './index.scss';

export const BreadCrumbsSkeleton = () => {
  const cls = classNames('bread-crumbs', 'bread-crumbs__skeleton');
  return (
    <div className={cls}>
      <div className="bread-crumb">
        <Skeleton width={50} />
      </div>
      <div className="bread-crumb">
        <Skeleton width={200} />
      </div>
    </div>
  );
};
