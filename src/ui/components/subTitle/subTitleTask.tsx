import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { ITaskUserDTO } from '@model/entities/task';
import { TagTask } from '@ui/components/tag/tagTask';

interface IProps {
  userTask?: ITaskUserDTO | null;
}

export const SubTitleTask = observer((props: IProps) => {
  const { userTask } = props;
  return (
    <Stack direction="row" spacing={2}>
      <TagTask userTask={userTask} />
    </Stack>
  );
});
