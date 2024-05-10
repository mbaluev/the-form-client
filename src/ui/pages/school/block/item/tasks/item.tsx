import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { ITaskUserDTO } from '@model/entities/task';

interface IProps {
  item: ITaskUserDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  return (
    <Stack spacing={1} alignItems="flex-start">
      <Typography
        noWrap
        whiteSpace="normal"
        display="-webkit-box"
        sx={{ WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}
      >
        {item.task?.document?.name}
      </Typography>
    </Stack>
  );
});
