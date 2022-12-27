import React, { useRef } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { SkeletonRenderer } from '@ui/layout/grid/renderers/base/skeletonRenderer';
import { classNames } from '@utils/classNames';
import { EmptyRenderer } from '@ui/layout/grid/renderers/base/emptyRenderer';
import './index.scss';

export const DefaultRenderer = (props: ICellRendererParams) => {
  const cls = classNames('default-renderer');
  const labelRef = useRef<HTMLDivElement>(null);

  if (props.data === undefined) {
    return <SkeletonRenderer />;
  }

  if (props.value === undefined) {
    return <EmptyRenderer />;
  }

  return (
    <div ref={labelRef} className={cls}>
      {props.value}
    </div>
  );
};
