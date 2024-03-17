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
  let icon = <DoDisturbIcon color="secondary" />;
  if (userBlock?.enable && !userBlock?.completeQuestions) {
    icon = <CircleOutlinedIcon color="secondary" />;
  }
  if (userBlock?.completeQuestions) {
    icon = <CheckCircleIcon color="success" />;
  }
  if (userBlock?.errorQuestions) {
    icon = <CheckCircleIcon color="error" />;
  }
  if (userBlock?.commentQuestions) {
    icon = <ChatIcon color="error" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
