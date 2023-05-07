import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';

export const getTaskIcon = (status?: string, style?: object) => {
  let icon = (
    <RadioButtonUncheckedIcon className="color_grey-50" style={style} />
  );
  if (status === 'done')
    icon = <CheckCircleIcon className="color_blue" style={style} />;
  if (status === 'sent')
    icon = <CallMadeRoundedIcon className="color_blue" style={style} />;
  if (status === 'inbox')
    icon = (
      <CallReceivedRoundedIcon className="color_green-dark" style={style} />
    );
  return icon;
};

export const TaskRenderer = (props: ICellRendererParams) => {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span>{props.value.index}.</span>
      {getTaskIcon(props.value.status)}
      <span>{props.value.name}</span>
    </div>
  );
};
