import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { TaskCompleteIcon } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskCompleteIcon';
import { TaskStatusIcon } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskStatusIcon';

export const TaskTitle = observer(() => {
  const { data } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);
  return (
    <Stack direction="row" spacing="10px">
      <TaskCompleteIcon
        complete={data?.complete}
        style={{ marginTop: '4px' }}
      />
      <TaskStatusIcon sent={data?.sent} style={{ marginTop: '4px' }} />
      {data ? <div>{data.document?.name}</div> : undefined}
    </Stack>
  );
});
