import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { IconTask } from '@ui/components/statuses/iconTask';

export const TaskTitle = observer(() => {
  const { data: userTask } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );
  const name = userTask?.task?.document?.name;
  return (
    <Stack direction="row" spacing={2}>
      <IconTask userTask={userTask} style={{ marginTop: '4px' }} />
      {name && <div>{name}</div>}
    </Stack>
  );
});
