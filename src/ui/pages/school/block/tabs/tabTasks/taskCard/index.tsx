import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { TaskCardActions } from '@ui/pages/school/block/tabs/tabTasks/taskCardActions';
import { TaskCardContent } from '@ui/pages/school/block/tabs/tabTasks/taskCardContent';
import { TaskLabel } from '@ui/pages/school/block/tabs/tabTasks/taskLabel';

export const TaskCard = observer(() => {
  const { data, isDataLoading } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  if (!data) return <Page204 />;

  return (
    <Page title={<TaskLabel />} quickFilter={<TaskCardActions />}>
      <Loader loading={isDataLoading} />
      <TaskCardContent />
    </Page>
  );
});
