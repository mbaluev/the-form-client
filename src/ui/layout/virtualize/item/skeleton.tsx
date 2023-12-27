import { observer } from 'mobx-react';
import { Skeleton, Grid } from '@mui/material';
import { CheckboxField } from 'core/components/fields/checkboxField';
import classes from './item.module.scss';
import Divider from '@mui/material/Divider';

interface IProps {
  checkbox?: boolean;
}

export const VirtualizeSkeleton = observer((props: IProps) => {
  const { checkbox } = props;
  return (
    <div className={classes.item}>
      <Divider />
      <div className={classes.item_container}>
        {checkbox && (
          <div className={classes.item_checkbox}>
            <CheckboxField size="small" disabled />
          </div>
        )}
        <div className={classes.item_content}>
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={6}>
                <Skeleton />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Divider sx={{ borderWidth: 1, borderColor: 'transparent' }} />
    </div>
  );
});
