import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { TaskIcon } from '@ui/pages/admin/task/taskList/taskIcon';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';

export const TaskTitle = observer(() => {
  const { data } = useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);
  return (
    <Stack direction="row" spacing="10px">
      <TaskIcon
        complete={data?.complete}
        sent={data?.sent}
        style={{ marginTop: '4px' }}
      />
      {data ? <div>{data.task?.document?.name}</div> : undefined}
    </Stack>
  );
});
