import { observer } from 'mobx-react';
import { Skeleton, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CheckboxField } from 'core/components/fields/checkboxField';
import IconButton from '@mui/material/IconButton';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import classes from './item.module.scss';
import Divider from '@mui/material/Divider';

export const VirtualizeSkeleton = observer(() => {
  return (
    <div className={classes.item}>
      <Divider />
      <div className={classes.item_container}>
        <div className={classes.item_checkbox}>
          <CheckboxField size="small" disabled />
        </div>
        <div className={classes.item_content}>
          <div style={{ flexGrow: 0 }}>
            <Skeleton variant="rounded" width={40} height={40} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Stack>
                  <Skeleton width="25%" />
                  <Skeleton width="75%" />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack>
                  <Skeleton width="25%" />
                  <Skeleton width="75%" />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack>
                  <Skeleton width="25%" />
                  <Skeleton width="75%" />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack flexGrow={1} alignItems="flex-end">
                  <Skeleton width="25%" />
                  <Skeleton width="75%" />
                </Stack>
              </Grid>
            </Grid>
          </div>
          <div style={{ flexGrow: 0 }}>
            <IconButton size="small" disabled>
              <MoreVertOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Divider sx={{ borderWidth: 1, borderColor: 'transparent' }} />
    </div>
  );
});
