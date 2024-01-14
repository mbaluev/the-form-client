import React, { useEffect } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { QuestionList } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabQuestions/questionList';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

export const TabQuestions = observer(() => {
  const { getList } = useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  useEffect(() => {
    getList();
  }, []);

  return <QuestionList />;
});
