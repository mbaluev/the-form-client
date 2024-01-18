import { Chip, Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { IUserDTO } from '@model/entities/user';
import Typography from '@mui/material/Typography';

interface IProps {
  item: IUserDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  const grey = theme.palette.fGrey[100];
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Stack direction="row" spacing={2} overflow="hidden">
        <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
          {item.username}
        </Typography>
        <Typography>-</Typography>
        <Typography
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          fontWeight={600}
          color={grey}
        >
          {item.firstname}
        </Typography>
        <Typography
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          fontWeight={600}
          color={grey}
        >
          {item.lastname}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        {item.active && <Chip label="active" color="primary" size="small" />}
        {item.paid && <Chip label="paid" color="success" size="small" />}
        {item.admin && <Chip label="admin" color="error" size="small" />}
      </Stack>
    </Stack>
  );
});
