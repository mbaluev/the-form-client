import React from 'react';
import { Skeleton } from '@components/skeleton';
import './index.scss';

interface ISkeletonRendererProps {
  twice?: boolean;
}

export const SkeletonRenderer = (props: ISkeletonRendererProps) => {
  const { twice } = props;
  return (
    <div className="skeleton-renderer">
      <Skeleton />
      {twice && <Skeleton />}
    </div>
  );
};
