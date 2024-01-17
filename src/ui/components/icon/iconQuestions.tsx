import { IBlockUserDTO } from '@model/entities/block';
import { statusQuestions } from '@ui/components/status/statusQuestions';
import { Tooltip } from '@theme/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const IconQuestions = (props: IProps) => {
  const { userBlock } = props;
  const title = statusQuestions(userBlock);
  let icon = <DoDisturbIcon className="color_grey-50" />;
  if (userBlock?.enable && !userBlock?.completeQuestions) {
    icon = <CircleOutlinedIcon className="color_grey-50" />;
  }
  if (userBlock?.completeQuestions) {
    icon = <CheckCircleIcon className="color_green" />;
  }
  if (userBlock?.errorQuestions) {
    icon = <CheckCircleIcon className="color_red" />;
  }
  if (userBlock?.commentQuestions) {
    icon = <ChatIcon className="color_red" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
