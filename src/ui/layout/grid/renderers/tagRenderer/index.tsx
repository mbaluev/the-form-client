import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { classNames } from '@utils/classNames';
import { Tag } from '@components/tag';

export const TagRenderer = (props: ICellRendererParams) => {
  const cls = classNames('tag-renderer');

  if (!props.value) return null;
  return <Tag className={cls} tag={props.value.status} color={props.value.color} />;
};
