import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { IconDocument } from '@ui/components/icon/iconDocument';
import { ITaskUserDTO } from '@model/entities/task';
import { IconTask } from '@ui/components/icon/iconTask';

interface IProps {
  item: ITaskUserDTO;
}

export const Avatar = observer((props: IProps) => {
  const { item } = props;
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconTask userTask={item} />
      <IconDocument document={item.task?.document} />
    </Stack>
  );
});
