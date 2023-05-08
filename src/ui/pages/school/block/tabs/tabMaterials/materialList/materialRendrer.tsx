import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Tooltip } from '@components/tooltip';

export const getMaterialIcon = (complete?: boolean, style?: object) => {
  let icon = (
    <Tooltip title="New">
      <RadioButtonUncheckedIcon className="color_grey-50" style={style} />
    </Tooltip>
  );
  if (complete)
    icon = (
      <Tooltip title="Donwloaded">
        <CheckCircleIcon className="color_blue" style={style} />
      </Tooltip>
    );
  return icon;
};

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
      {getMaterialIcon(props.value.complete)}
      <span>{props.value.name}</span>
    </div>
  );
};
