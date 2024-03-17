import { observer } from 'mobx-react';
import { statusTask } from '@ui/components/status/statusTask';
import { ITaskUserDTO } from '@model/entities/task';
import { Chip, ChipProps } from '@mui/material';

interface IProps {
  userTask?: ITaskUserDTO | null;
  admin?: boolean;
}

export const TagTask = observer((props: IProps) => {
  const { userTask, admin } = props;
  const label = statusTask(userTask, admin);
  let color: ChipProps['color'] = 'secondary';
  if (!admin && userTask?.sent === false) {
    color = 'error';
  }
  if (!admin && userTask?.sent === true) {
    color = 'primary';
  }
  if (admin && userTask?.sent === true) {
    color = 'error';
  }
  if (admin && userTask?.sent === false) {
    color = 'primary';
  }
  if (userTask?.complete) {
    color = 'success';
  }
  return <Chip label={label} color={color} size="small" sx={{ width: 'fit-content' }} />;
});
