import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { statusQuestion } from '@ui/components/status/statusQuestion';
import { IQuestionUserDTO } from '@model/entities/question';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const TagQuestion = observer((props: IProps) => {
  const { userQuestion } = props;
  const tag: ITagProps = {
    tag: statusQuestion(userQuestion),
    color: 'grey',
  };
  if (
    userQuestion?.userQuestionAnswers &&
    userQuestion?.userQuestionAnswers.length > 0
  ) {
    tag.color = 'grey';
  }
  if (userQuestion?.complete) {
    tag.color = 'green';
  }
  if (userQuestion?.error) {
    tag.color = 'red';
  }
  if (userQuestion?.comment) {
    tag.color = 'red';
  }
  return <Tag {...tag} />;
});
