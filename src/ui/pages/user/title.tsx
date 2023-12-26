import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@theme/tooltip';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title="Complete with comments">
        <ChatIcon color="error" sx={{ marginTop: '3px !important' }} />
      </Tooltip>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>
        What is business analysis?
      </Typography>
    </Stack>
  );
};
