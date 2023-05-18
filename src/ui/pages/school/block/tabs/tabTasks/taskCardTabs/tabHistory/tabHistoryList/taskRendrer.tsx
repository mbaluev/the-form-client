import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import { Tooltip } from '@components/tooltip';

export const getTaskCompleteIcon = (complete?: boolean, style?: object) => {
  let icon = (
    <Tooltip title="Todo">
      <RadioButtonUncheckedIcon className="color_grey-50" style={style} />
    </Tooltip>
  );
  if (complete)
    icon = (
      <Tooltip title="Complete">
        <CheckCircleIcon className="color_blue" style={style} />
      </Tooltip>
    );
  return icon;
};

export const getTaskStatusIcon = (status?: string, style?: object) => {
  let icon = undefined;
  if (status === 'sent')
    icon = (
      <Tooltip title="Sent">
        <CallMadeRoundedIcon className="color_blue" style={style} />
      </Tooltip>
    );
  if (status === 'income')
    icon = (
      <Tooltip title="Income">
        <CallReceivedRoundedIcon className="color_green-dark" style={style} />
      </Tooltip>
    );
  return icon;
};

export const TaskRenderer = (props: ICellRendererParams) => {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span>{props.value.index}.</span>
      {getTaskCompleteIcon(props.value.complete)}
      {getTaskStatusIcon(props.value.status)}
      <span>{props.value.name}</span>
    </div>
  );
};
