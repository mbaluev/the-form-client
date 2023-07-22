import { ITaskUserDTO } from '@model/entities/task';
import { titleTask } from '@ui/components/icons/titleTask';
import { Tooltip } from '@components/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userTask?: ITaskUserDTO | null;
  style?: object;
}

export const IconTask = (props: IProps) => {
  const { userTask, style } = props;
  const title = titleTask(userTask);
  let icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  if (userTask?.sent === false) {
    icon = <CallReceivedRoundedIcon className="color_red" style={style} />;
  }
  if (userTask?.sent === true) {
    icon = <CallMadeRoundedIcon className="color_blue" style={style} />;
  }
  if (userTask?.complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
