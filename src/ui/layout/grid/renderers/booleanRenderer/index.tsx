import React, { useRef } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { SkeletonRenderer } from '@ui/layout/grid/renderers/skeletonRenderer';
import { classNames } from '@utils/classNames';
import { EmptyRenderer } from '@ui/layout/grid/renderers/emptyRenderer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import './index.scss';

export const BooleanRenderer = (props: ICellRendererParams) => {
  const cls = classNames('boolean-renderer', {
    'boolean-renderer_checked': props.value === true,
  });
  const labelRef = useRef<HTMLDivElement>(null);

  if (props.data === undefined) {
    return <SkeletonRenderer />;
  }

  if (props.value === undefined) {
    return <EmptyRenderer />;
  }

  return (
    <div ref={labelRef} className={cls}>
      {props.value === true ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
    </div>
  );
};
