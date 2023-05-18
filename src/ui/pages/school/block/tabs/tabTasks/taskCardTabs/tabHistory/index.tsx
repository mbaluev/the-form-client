import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TabHistoryList } from '@ui/pages/school/block/tabs/tabTasks/taskCardTabs/tabHistory/tabHistoryList';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { ITaskHistoryViewModel } from '@viewModel/modules/task/history/interface';

export const TabHistory = observer(() => {
  const { data: task } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);
  const { setList, clearList } = useViewModel<ITaskHistoryViewModel>(
    VIEW_MODEL.TaskHistory
  );

  useEffect(() => {
    if (task) setList(task.documentHistory);
    return () => {
      clearList();
    };
  }, [task]);

  return <TabHistoryList />;
});
