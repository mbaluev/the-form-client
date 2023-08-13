import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TaskList } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabTasks/taskList';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';

export const TabTasks = observer(() => {
  const { getList } = useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  useEffect(() => {
    getList();
  }, []);

  return <TaskList />;
});
