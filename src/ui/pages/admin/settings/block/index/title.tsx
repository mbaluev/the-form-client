import { PageIcon } from '@ui/layout/page/pageIcon';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export const Title = () => {
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <BookmarksIcon color="primary" />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        Blocks
      </Typography>
    </Stack>
  );
};
