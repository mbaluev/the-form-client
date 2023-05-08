import React, { useEffect } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { observer } from 'mobx-react';
import { HomeworkList } from '@ui/pages/school/block/tabs/_tabHomework/homeworkList';

export const TabHomework = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { isListLoading, getList, clearList } =
    useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  useEffect(() => {
    if (block) getList();
    return () => {
      clearList();
    };
  }, [block]);

  if (isListLoading) return <Loader loading={true} />;

  return <HomeworkList />;
});
