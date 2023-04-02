import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { useLazyImage } from '@hooks/useLazyImage';

export const ImageRenderer = (props: ICellRendererParams) => {
  const { LazyImage } = useLazyImage(props.value[0]);
  return <LazyImage />;
};
