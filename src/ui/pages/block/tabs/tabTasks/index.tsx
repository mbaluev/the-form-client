import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { TaskList } from '@ui/pages/block/tabs/tabTasks/taskList';

export const TabTasks = observer(() => {
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

  return <TaskList />;
});
