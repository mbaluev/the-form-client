import { IBlockUserDTO } from '@model/entities/block';
import { statusTasks } from '@ui/components/status/statusTasks';
import { Tooltip } from '@theme/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const IconTasks = (props: IProps) => {
  const { userBlock, admin } = props;
  const title = statusTasks(userBlock, admin);
  let icon = <DoDisturbIcon color="secondary" />;
  if (userBlock?.enable && !userBlock?.completeTasks) {
    icon = <CircleOutlinedIcon color="primary" />;
  }
  if (
    (!admin && (userBlock?.sentTasksAdmin === true || userBlock?.sentTasksUser === false)) ||
    (admin && (userBlock?.sentTasksUser === true || userBlock?.sentTasksAdmin === false))
  ) {
    icon = <CallReceivedRoundedIcon color="error" />;
  } else if (
    (admin && (userBlock?.sentTasksUser === false || userBlock?.sentTasksAdmin === true)) ||
    (!admin && (userBlock?.sentTasksAdmin === false || userBlock?.sentTasksUser === true))
  ) {
    icon = <CallMadeRoundedIcon color="primary" />;
  }
  if (userBlock?.completeTasks) {
    icon = <CheckIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
