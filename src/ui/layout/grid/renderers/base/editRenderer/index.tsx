import React, { useRef } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { classNames } from '@utils/classNames';
import './index.scss';

export const EditRenderer = (props: ICellRendererParams) => {
  const cls = classNames('edit-renderer');
  const labelRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={labelRef} className={cls}>
      {props.value}
    </div>
  );
};
