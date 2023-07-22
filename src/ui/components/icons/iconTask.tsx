import { Tooltip } from '@components/tooltip';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';
import { IBlockUserDTO } from '@model/entities/block';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import { titleTask } from '@ui/components/icons/titleTask';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const IconTask = (props: IProps) => {
  const { userBlock, admin } = props;
  const title = titleTask(userBlock, admin);
  let icon = <DoDisturbIcon className="color_grey-50" />;
  if (userBlock?.enable && !userBlock?.completeTasks) {
    icon = <RadioButtonUncheckedIcon className="color_grey-50" />;
  }
  if (userBlock?.completeTasks) {
    icon = <CheckCircleIcon className="color_green" />;
  }
  if (!admin && userBlock?.sentTasks === true) {
    icon = <CallMadeRoundedIcon className="color_blue" />;
  }
  if (!admin && userBlock?.sentTasks === false) {
    icon = <CallReceivedRoundedIcon className="color_red" />;
  }
  if (admin && userBlock?.sentTasks === true) {
    icon = <CallReceivedRoundedIcon className="color_red" />;
  }
  if (admin && userBlock?.sentTasks === false) {
    icon = <CallMadeRoundedIcon className="color_blue" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
