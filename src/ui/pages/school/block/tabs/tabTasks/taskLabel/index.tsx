import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { getTaskIcon } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskRendrer';

export const TaskLabel = observer(() => {
  const { data } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);
  const icon = getTaskIcon(data?.status, { marginTop: '4px' });
  const label = data ? <div>{data.document?.name}</div> : undefined;
  return (
    <Stack direction="row" spacing="10px">
      {icon}
      {label}
    </Stack>
  );
});
