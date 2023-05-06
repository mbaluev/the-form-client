import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';

export const TaskRenderer = (props: ICellRendererParams) => {
  let icon = <RadioButtonUncheckedIcon className="color_grey-50" />;
  if (props.value.status === 'done')
    icon = <CheckCircleIcon className="color_blue" />;
  if (props.value.status === 'sent')
    icon = <CallMadeRoundedIcon className="color_blue" />;
  if (props.value.status === 'inbox')
    icon = <CallReceivedRoundedIcon className="color_green-dark" />;

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span>{props.value.index}.</span>
      {icon}
      <span>{props.value.name}</span>
    </div>
  );
};
