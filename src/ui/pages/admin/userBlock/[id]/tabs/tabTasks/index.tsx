import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { TaskList } from '@ui/pages/admin/userBlock/[id]/tabs/tabTasks/taskList';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';

export const TabTasks = observer(() => {
  const { isListLoading, getList } = useViewModel<ITaskAdminViewModel>(
    VIEW_MODEL.TaskAdmin
  );

  useEffect(() => {
    getList();
  }, []);

  if (isListLoading) return <Loader loading={true} />;

  return <TaskList />;
});
