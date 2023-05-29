import { Tooltip } from '@components/tooltip';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import React from 'react';

interface IProps {
  sent?: boolean;
  style?: object;
}

export const TaskStatusIcon = (props: IProps) => {
  const { sent, style } = props;
  let icon = null;
  if (sent === true)
    icon = (
      <Tooltip title="Sent">
        <CallMadeRoundedIcon className="color_blue" style={style} />
      </Tooltip>
    );
  if (sent === false)
    icon = (
      <Tooltip title="Income">
        <CallReceivedRoundedIcon className="color_green-dark" style={style} />
      </Tooltip>
    );
  return icon;
};
