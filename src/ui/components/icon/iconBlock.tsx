import { IBlockUserDTO } from '@model/entities/block';
import { statusBlock } from '@ui/components/status/statusBlock';
import { Tooltip } from '@theme/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const IconBlock = (props: IProps) => {
  const { userBlock } = props;
  const title = statusBlock(userBlock);
  let icon = <DoDisturbIcon color="secondary" />;
  if (userBlock?.enable && !userBlock.complete) {
    icon = <CircleOutlinedIcon color="primary" />;
  }
  if (userBlock?.enable && userBlock.complete) {
    icon = <CheckCircleIcon color="success" />;
  }
  if (userBlock?.enable && userBlock.complete && userBlock.errorQuestions) {
    icon = <CheckCircleIcon color="error" />;
  }
  if (
    userBlock?.enable &&
    userBlock.complete &&
    userBlock.errorQuestions &&
    userBlock.commentQuestions
  ) {
    icon = <ChatIcon color="error" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
