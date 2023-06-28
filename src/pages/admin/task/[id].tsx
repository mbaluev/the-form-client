import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { ITaskService } from '@service/modules/entities/task/interface';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { TaskPage } from '@ui/pages/admin/task/taskPage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params, query } = context;
  const token = getCookieToken(context);
  const serviceTask = useService<ITaskService>(SERVICE.Task);

  const tasks = (await serviceTask.getTasksAdmin(query, token)) || null;
  const task =
    (await serviceTask.getTaskAdmin(params?.id, query, token)) || null;

  return { props: { tasks, task } };
};

const Task = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { tasks, task } = props;
  const {
    setList: setTasks,
    setData: setTask,
    clearList: clearTasks,
    clearData: clearTask,
  } = useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_TASKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_TASKS.path },
    },
    {
      label: task
        ? `${task.user.username} - ${task.task.block.name} - ${task.task.document.name}`
        : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_TASK.path,
        query: { id: task?.id },
      },
      disabled: !Boolean(task),
    },
  ];

  useEffect(() => {
    setTasks(tasks);
    setTask(task);
    return () => {
      clearTasks();
      clearTask();
    };
  });

  return <TaskPage breadCrumbs={breadCrumbs} />;
};

Task.Layout = MasterSchool;
export default observer(Task);
