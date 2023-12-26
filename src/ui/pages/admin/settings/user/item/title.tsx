import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@theme/tooltip';
import PersonIcon from '@mui/icons-material/Person';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title="user">
        <PersonIcon color="error" sx={{ marginTop: '3px !important' }} />
      </Tooltip>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>User</Typography>
    </Stack>
  );
};
