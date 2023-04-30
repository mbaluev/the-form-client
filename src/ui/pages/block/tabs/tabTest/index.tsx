import React, { useEffect } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { TestList } from '@ui/pages/block/tabs/tabTest/testList';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IQuestionUserViewModel } from '@viewModel/modules/question/user/interface';
import { Loader } from '@components/loader';

export const TabTest = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { isListLoading, getList, clearList } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  useEffect(() => {
    if (block) getList();
    return () => {
      clearList();
    };
  }, [block]);

  if (isListLoading) return <Loader loading={true} />;

  return <TestList />;
});
