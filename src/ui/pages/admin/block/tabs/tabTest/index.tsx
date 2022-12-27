import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TestList } from '@ui/pages/admin/block/tabs/tabTest/testList';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IQuestionViewModel } from '@viewModel/modules/question/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';

export const TabTest = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const { getList } = useViewModel<IQuestionViewModel>(VIEW_MODEL.Question);

  useEffect(() => {
    if (block) getList();
  }, [block]);

  return <TestList />;
});
