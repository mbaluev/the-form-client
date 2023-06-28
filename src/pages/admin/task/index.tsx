import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { TaskPage } from '@ui/pages/admin/task/taskPage';
import { ITaskService } from '@service/modules/entities/task/interface';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceTask = useService<ITaskService>(SERVICE.Task);

  const tasks = (await serviceTask.getTasksAdmin(query, token)) || null;

  return { props: { tasks } };
};

const Tasks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { tasks } = props;
  const { setList: setTasks, clearList: clearTasks } =
    useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_TASKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_TASKS.path },
    },
  ];

  useEffect(() => {
    setTasks(tasks);
    return () => {
      clearTasks();
    };
  });

  return <TaskPage breadCrumbs={breadCrumbs} />;
};

Tasks.Layout = MasterSchool;
export default observer(Tasks);
