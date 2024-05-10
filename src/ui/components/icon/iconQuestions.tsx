import { IBlockUserDTO } from '@model/entities/block';
import { statusQuestions } from '@ui/components/status/statusQuestions';
import { Tooltip } from '@theme/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const IconQuestions = (props: IProps) => {
  const { userBlock } = props;
  const title = statusQuestions(userBlock);
  let icon = <DoDisturbIcon color="secondary" />;
  if (userBlock?.enable && !userBlock?.completeQuestions) {
    icon = <CircleOutlinedIcon color="primary" />;
  }
  if (userBlock?.completeQuestions) {
    icon = <CheckIcon color="success" />;
  }
  if (userBlock?.errorQuestions) {
    icon = <CheckIcon color="error" />;
  }
  if (userBlock?.commentQuestions) {
    icon = <ChatIcon color="error" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
