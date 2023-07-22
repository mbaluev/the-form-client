import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { titleQuestion } from '@ui/components/icons/titleQuestion';

export const QuestionSubTitle = observer(() => {
  const { data: userQuestion } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );
  const tag: ITagProps = {
    tag: titleQuestion(userQuestion),
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
