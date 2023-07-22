import { IQuestionUserDTO } from '@model/entities/question';
import { titleQuestion } from '@ui/components/statuses/titleQuestion';
import { Tooltip } from '@components/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
  style?: object;
}

export const IconQuestion = (props: IProps) => {
  const { userQuestion, style } = props;
  const title = titleQuestion(userQuestion);
  let icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  if (
    userQuestion?.userQuestionAnswers &&
    userQuestion?.userQuestionAnswers.length > 0
  ) {
    icon = <CheckCircleIcon className="color_grey-50" style={style} />;
  }
  if (userQuestion?.complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  if (userQuestion?.error) {
    icon = <CheckCircleIcon className="color_red" style={style} />;
  }
  if (userQuestion?.comment) {
    icon = <ChatIcon className="color_red" style={style} />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
