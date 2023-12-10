import { Grid, Skeleton } from '@mui/material';
import { FieldCard } from '@ui/layout/card/fieldCard';
import Divider from '@mui/material/Divider';

export const TabSkeleton = () => {
  const spacing = 4;
  return (
    <Grid container spacing={spacing}>
      <Grid item xs={6}>
        <FieldCard title={<Skeleton width={100} />}>
          <Skeleton width={200} />
        </FieldCard>
      </Grid>
      <Grid item xs={6}>
        <FieldCard title={<Skeleton width={100} />}>
          <Skeleton width={200} />
        </FieldCard>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <FieldCard title={<Skeleton width={100} />}>
          <Skeleton width={200} />
        </FieldCard>
      </Grid>
      <Grid item xs={6}>
        <FieldCard title={<Skeleton width={100} />}>
          <Skeleton width={200} />
        </FieldCard>
      </Grid>
      <Grid item xs={6}>
        <FieldCard title={<Skeleton width={100} />}>
          <Skeleton width={200} />
        </FieldCard>
      </Grid>
    </Grid>
  );
};
