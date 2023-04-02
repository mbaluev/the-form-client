import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { SkeletonRenderer } from '@ui/layout/grid/renderers/skeletonRenderer';
import { EmptyRenderer } from '@ui/layout/grid/renderers/emptyRenderer';
import './index.scss';

export const MultiRenderer = (props: ICellRendererParams) => {
  if (props.data === undefined) {
    return <SkeletonRenderer />;
  }

  if (props.value === undefined) {
    return <EmptyRenderer />;
  }

  return <div className="multi-renderer">{props.value}</div>;
};
