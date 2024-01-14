import { Chip, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

export const SubTitle = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <Chip size="small" color="error" label="tag" />
      <Typography sx={{ fontWeight: 600, color: theme.palette.fGrey['100'] }}>subtitle</Typography>
    </Stack>
  );
};
