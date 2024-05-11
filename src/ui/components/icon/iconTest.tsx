import { IQuestionDTO } from '@model/entities/question';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

interface IProps {
  item?: IQuestionDTO;
}

export const IconTest = (props: IProps) => {
  const { item } = props;
  if (!item) return null;

  return <QuizOutlinedIcon color="primary" />;
};
