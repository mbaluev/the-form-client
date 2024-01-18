import { Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { IModuleDTO } from '@model/entities/module';

interface IProps {
  item: IModuleDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  const grey = theme.palette.fGrey[150];
  return (
    <Stack direction="row" spacing={2} overflow="hidden">
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        {`${item.position}.`}
      </Typography>
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        {item.title}
      </Typography>
      <Typography>-</Typography>
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" color={grey}>
        {item.name}
      </Typography>
    </Stack>
  );
});
