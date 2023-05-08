import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { TaskCardActions } from '@ui/pages/school/block/tabs/tabTasks/taskCardActions';
import { TaskTitle } from 'ui/pages/school/block/tabs/tabTasks/taskTitle';
import { TaskSubTitle } from '@ui/pages/school/block/tabs/tabTasks/taskSubTitle';
import { TaskCardTabs } from '@ui/pages/school/block/tabs/tabTasks/taskCardTabs';

export const TaskCard = observer(() => {
  const { data, isDataLoading } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  if (!data) return <Page204 />;

  return (
    <Page
      subTitle={<TaskSubTitle />}
      title={<TaskTitle />}
      quickFilter={<TaskCardActions />}
    >
      <Loader loading={isDataLoading} />
      <TaskCardTabs />
    </Page>
  );
});
