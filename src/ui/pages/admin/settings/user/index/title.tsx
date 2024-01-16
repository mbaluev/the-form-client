import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import GroupIcon from '@mui/icons-material/Group';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <GroupIcon color="error" sx={{ marginTop: '3px !important' }} />
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        Users
      </Typography>
    </Stack>
  );
};
