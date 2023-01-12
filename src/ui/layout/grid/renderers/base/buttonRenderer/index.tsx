import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Button } from '@components/button';
import { classNames } from '@utils/classNames';
import './index.scss';

export const ButtonRenderer = (props: ICellRendererParams) => {
  if (!props.value && !props.value.children) return null;
  const cls = classNames('button-renderer');
  return (
    <div className={cls}>
      <Button {...props.value} />
    </div>
  );
};
