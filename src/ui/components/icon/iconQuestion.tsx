import { IQuestionUserDTO } from '@model/entities/question';
import { statusQuestion } from '@ui/components/status/statusQuestion';
import { Tooltip } from '@theme/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const IconQuestion = (props: IProps) => {
  const { userQuestion } = props;
  const title = statusQuestion(userQuestion);
  let icon = <CircleOutlinedIcon color="secondary" />;
  if (userQuestion?.userQuestionAnswers && userQuestion?.userQuestionAnswers.length > 0) {
    icon = <CheckCircleIcon color="secondary" />;
  }
  if (userQuestion?.complete) {
    icon = <CheckCircleIcon color="success" />;
  }
  if (userQuestion?.error) {
    icon = <CheckCircleIcon color="error" />;
  }
  if (userQuestion?.commentText) {
    icon = <ChatIcon color="error" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
