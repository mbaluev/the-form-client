import { ITaskUserDTO } from '@model/entities/task';
import { statusTask } from '@ui/components/status/statusTask';
import { Tooltip } from '@theme/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userTask?: ITaskUserDTO | null;
  admin?: boolean;
}

export const IconTask = (props: IProps) => {
  const { userTask, admin } = props;
  const title = statusTask(userTask);
  let icon = <CircleOutlinedIcon color="secondary" />;
  if ((admin && userTask?.sent === true) || (!admin && userTask?.sent === false)) {
    icon = <CallReceivedRoundedIcon color="error" />;
  }
  if ((admin && userTask?.sent === false) || (!admin && userTask?.sent === true)) {
    icon = <CallMadeRoundedIcon color="primary" />;
  }
  if (userTask?.complete) {
    icon = <CheckCircleIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
