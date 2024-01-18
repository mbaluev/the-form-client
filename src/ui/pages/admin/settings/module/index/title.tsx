import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { PageIcon } from '@ui/layout/page/pageIcon';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <SchoolIcon color="primary" />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        Modules
      </Typography>
    </Stack>
  );
};
