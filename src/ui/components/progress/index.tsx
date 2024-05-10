import { observer } from 'mobx-react';
import { LinearProgress, LinearProgressProps, useTheme, Stack, Typography } from '@mui/material';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';

export const ProgressBar = observer((props: LinearProgressProps) => {
  const { value, sx, ...otherProps } = props;
  const { fPercent } = useLocaleStore();
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={3} alignItems="center" sx={sx}>
      <LinearProgress
        color={value === 100 ? 'success' : 'primary'}
        variant="determinate"
        value={value}
        sx={{ flexGrow: 1 }}
        {...otherProps}
      />
      <Typography color={theme.palette.common.black}>{fPercent(value)}</Typography>
    </Stack>
  );
});
