import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { IModuleDTO } from '@model/entities/module';

interface IProps {
  item: IModuleDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  return (
    <Stack direction="row" spacing={2} overflow="hidden">
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        {`${item.position}.`}
      </Typography>
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        {item.name}
      </Typography>
      <Typography>-</Typography>
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        {item.title}
      </Typography>
    </Stack>
  );
});
