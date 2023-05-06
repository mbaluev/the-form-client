import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const MaterialRenderer = (props: ICellRendererParams) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <span>{props.value.index}.</span>
      {props.value.complete ? (
        <CheckCircleIcon className="color_blue" />
      ) : (
        <RadioButtonUncheckedIcon className="color_grey-50" />
      )}
      <span>{props.value.name}</span>
    </div>
  );
};
