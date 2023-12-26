import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@theme/tooltip';
import GroupIcon from '@mui/icons-material/Group';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title="list of users">
        <GroupIcon color="error" sx={{ marginTop: '3px !important' }} />
      </Tooltip>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>Users</Typography>
    </Stack>
  );
};
