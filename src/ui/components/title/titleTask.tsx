import React from 'react';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IconTask } from '@ui/components/icon/iconTask';
import { ITaskUserDTO } from '@model/entities/task';

interface IProps {
  userTask?: ITaskUserDTO | null;
  admin?: boolean;
}

export const TitleTask = observer((props: IProps) => {
  const { userTask, admin } = props;
  const name = userTask?.task?.document?.name;
  return (
    <Stack direction="row" spacing={2}>
      <IconTask
        userTask={userTask}
        style={{ marginTop: '5px' }}
        admin={admin}
      />
      {name && <div>{name}</div>}
    </Stack>
  );
});
