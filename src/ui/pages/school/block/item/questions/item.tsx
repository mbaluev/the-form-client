import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { IQuestionUserDTO } from '@model/entities/question';

interface IProps {
  item: IQuestionUserDTO;
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
        {item.question?.title}
      </Typography>
    </Stack>
  );
});
