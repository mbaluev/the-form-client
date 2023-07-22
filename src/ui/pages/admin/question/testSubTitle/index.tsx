import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { ITagProps, Tag } from '@components/tag';

export const TestSubTitle = observer(() => {
  const { data } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );

  const tag: ITagProps = { tag: 'Todo', color: 'grey' };
  if (data?.userBlock?.completeQuestions && !data?.userBlock?.errorQuestions) {
    tag.tag = 'Passed';
    tag.color = 'green';
  }
  if (data?.userBlock?.completeQuestions && data?.userBlock?.errorQuestions) {
    tag.tag = 'Failed';
    tag.color = 'red';
  }

  return (
    <React.Fragment>
      <Tag {...tag} />
      {data?.question?.block?.title}
    </React.Fragment>
  );
});
