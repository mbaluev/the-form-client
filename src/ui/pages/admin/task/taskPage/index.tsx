import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { TaskList } from '@ui/pages/admin/task/taskList';
import { TaskCard } from '@ui/pages/admin/task/taskCard';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const TaskPage = observer((props: IProps) => {
  const { breadCrumbs, ...other } = props;

  return (
    <Page
      title="Homeworks"
      breadCrumbs={breadCrumbs}
      padding={false}
      pageRight={<TaskCard />}
    >
      <TaskList {...other} />
    </Page>
  );
});
