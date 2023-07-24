import { ITaskUserDTO } from '@model/entities/task';
import { statusTask } from '@ui/components/status/statusTask';
import { Tooltip } from '@components/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userTask?: ITaskUserDTO | null;
  admin?: boolean;
  style?: object;
}

export const IconTask = (props: IProps) => {
  const { userTask, admin, style } = props;
  const title = statusTask(userTask);
  let icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  if (
    (admin && userTask?.sent === true) ||
    (!admin && userTask?.sent === false)
  ) {
    icon = <CallReceivedRoundedIcon className="color_red" style={style} />;
  }
  if (
    (admin && userTask?.sent === false) ||
    (!admin && userTask?.sent === true)
  ) {
    icon = <CallMadeRoundedIcon className="color_blue" style={style} />;
  }
  if (userTask?.complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
