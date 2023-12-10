import Stack from '@mui/material/Stack';
import { Skeleton, Typography } from '@mui/material';

export const TitleSkeleton = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Skeleton variant="rounded" width={60} height={60} />
      <Stack spacing={2} height="100%">
        <Typography sx={{ fontSize: '1.2rem' }}>
          <Skeleton width={100} />
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontSize: '0.9rem' }}>
            <Skeleton width={200} />
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
