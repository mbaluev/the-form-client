import { Chip, Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { useFormContext, useWatch } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';

export const SubTitle = observer(() => {
  const theme = useTheme();
  const { control } = useFormContext<IBlockDTO>();
  const name = useWatch({ control, name: 'name' });
  return (
    <Stack direction="row" spacing={2}>
      {name ? (
        <Typography
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          fontWeight={600}
          color={theme.palette.fGrey[100]}
        >
          {name}
        </Typography>
      ) : (
        <Chip label="new" color="secondary" size="small" />
      )}
    </Stack>
  );
});
