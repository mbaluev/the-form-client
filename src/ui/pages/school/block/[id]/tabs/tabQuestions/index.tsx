import React, { useEffect } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { QuestionList } from '@ui/pages/school/block/[id]/tabs/tabQuestions/questionList';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { Loader } from '@components/loader';

export const TabQuestions = observer(() => {
  const { isListLoading, getList } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );

  useEffect(() => {
    getList();
  }, []);

  if (isListLoading) return <Loader loading={true} />;

  return <QuestionList />;
});
