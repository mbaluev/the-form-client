import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IQuestionViewModel } from '@viewModel/modules/entities/question/interface';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { QuestionList } from 'ui/pages/admin/block/tabs/tabQuestions/questionList';

export const TabQuestions = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const { getList } = useViewModel<IQuestionViewModel>(VIEW_MODEL.Question);

  useEffect(() => {
    if (block) getList();
  }, [block]);

  return <QuestionList />;
});
