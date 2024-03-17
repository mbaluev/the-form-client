import { observer } from 'mobx-react';
import { statusQuestion } from '@ui/components/status/statusQuestion';
import { IQuestionUserDTO } from '@model/entities/question';
import { Chip, ChipProps } from '@mui/material';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const TagQuestion = observer((props: IProps) => {
  const { userQuestion } = props;
  const label = statusQuestion(userQuestion);
  let color: ChipProps['color'] = 'secondary';
  if (userQuestion?.userQuestionAnswers && userQuestion?.userQuestionAnswers.length > 0) {
    color = 'secondary';
  }
  if (userQuestion?.complete) {
    color = 'success';
  }
  if (userQuestion?.error) {
    color = 'error';
  }
  if (userQuestion?.commentText) {
    color = 'error';
  }
  return <Chip label={label} color={color} size="small" />;
});
