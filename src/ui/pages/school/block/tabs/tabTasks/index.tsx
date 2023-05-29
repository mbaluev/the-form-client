import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { TaskList } from '@ui/pages/school/block/tabs/tabTasks/taskList';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';

export const TabTasks = observer(() => {
  const { isListLoading, getList } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  useEffect(() => {
    getList();
  }, []);

  if (isListLoading) return <Loader loading={true} />;

  return <TaskList />;
});
