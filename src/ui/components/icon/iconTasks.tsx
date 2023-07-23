import { IBlockUserDTO } from '@model/entities/block';
import { statusTasks } from '@ui/components/status/statusTasks';
import { Tooltip } from '@components/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const IconTasks = (props: IProps) => {
  const { userBlock, admin } = props;
  const title = statusTasks(userBlock, admin);
  let icon = <DoDisturbIcon className="color_grey-50" />;
  if (userBlock?.enable && !userBlock?.completeTasks) {
    icon = <CircleOutlinedIcon className="color_grey-50" />;
  }
  if (!admin && userBlock?.sentTasksAdmin === false) {
    icon = <CallMadeRoundedIcon className="color_blue" />;
  }
  if (!admin && userBlock?.sentTasksAdmin === true) {
    icon = <CallReceivedRoundedIcon className="color_red" />;
  }
  if (admin && userBlock?.sentTasksUser === true) {
    icon = <CallReceivedRoundedIcon className="color_red" />;
  }
  if (admin && userBlock?.sentTasksUser === false) {
    icon = <CallMadeRoundedIcon className="color_blue" />;
  }
  if (userBlock?.completeTasks) {
    icon = <CheckCircleIcon className="color_green" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
