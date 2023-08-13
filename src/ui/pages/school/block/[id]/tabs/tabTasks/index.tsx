import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TaskList } from '@ui/pages/school/block/[id]/tabs/tabTasks/taskList';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';

export const TabTasks = observer(() => {
  const { getList } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  useEffect(() => {
    getList();
  }, []);

  return <TaskList />;
});
