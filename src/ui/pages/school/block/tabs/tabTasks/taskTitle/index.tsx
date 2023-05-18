import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import {
  getTaskCompleteIcon,
  getTaskStatusIcon,
} from '@ui/pages/school/block/tabs/tabTasks/taskList/taskRendrer';

export const TaskTitle = observer(() => {
  const { data } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);
  const iconComplete = getTaskCompleteIcon(data?.complete, {
    marginTop: '4px',
  });
  const iconStatus = getTaskStatusIcon(data?.status, {
    marginTop: '4px',
  });
  const label = data ? <div>{data.document?.name}</div> : undefined;

  return (
    <Stack direction="row" spacing="10px">
      {iconComplete}
      {iconStatus}
      {label}
    </Stack>
  );
});
