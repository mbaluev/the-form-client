import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <SchoolIcon color="error" sx={{ marginTop: '3px !important' }} />
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        Modules
      </Typography>
    </Stack>
  );
};
