import { Chip, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

export const SubTitle = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <Chip size="small" color="success" label="Complete with comments" />
      <Typography sx={{ lineHeight: '24px', fontWeight: 600, color: theme.palette.fGrey['100'] }}>
        Lecture1
      </Typography>
    </Stack>
  );
};
