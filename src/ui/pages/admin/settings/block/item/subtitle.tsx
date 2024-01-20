import { Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';

export const SubTitle = observer(() => {
  const { data } = useBlockItemStore();
  const displayName = data?.name || '...';
  const theme = useTheme();
  const grey = theme.palette.fGrey[100];
  return (
    <Stack direction="row" spacing={2}>
      <Typography
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        fontWeight={600}
        color={grey}
      >
        {displayName}
      </Typography>
    </Stack>
  );
});
