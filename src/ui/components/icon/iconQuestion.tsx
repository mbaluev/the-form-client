import { IQuestionUserDTO } from '@model/entities/question';
import { statusQuestion } from '@ui/components/status/statusQuestion';
import { Tooltip } from '@theme/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const IconQuestion = (props: IProps) => {
  const { userQuestion } = props;
  const title = statusQuestion(userQuestion);
  let icon = <CircleOutlinedIcon color="secondary" />;
  if (userQuestion?.userQuestionAnswers && userQuestion?.userQuestionAnswers.length > 0) {
    icon = <CheckIcon color="secondary" />;
  }
  if (userQuestion?.complete) {
    icon = <CheckIcon color="success" />;
  }
  if (userQuestion?.error) {
    icon = <CheckIcon color="error" />;
  }
  if (userQuestion?.commentText) {
    icon = <ChatIcon color="error" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
