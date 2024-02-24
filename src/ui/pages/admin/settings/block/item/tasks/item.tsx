import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { ITaskDTO } from '@model/entities/task';

interface IProps {
  item: ITaskDTO;
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
        {item.document?.name}
      </Typography>
    </Stack>
  );
});
