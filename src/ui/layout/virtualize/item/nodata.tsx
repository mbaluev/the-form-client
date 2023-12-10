import NoData from '@components/noData';
import { observer } from 'mobx-react';
import Divider from '@mui/material/Divider';
import classes from './item.module.scss';

export const VirtualizeNoData = observer(() => {
  return (
    <div className={classes.item}>
      <Divider />
      <div className={classes.item_container}>
        <NoData />
      </div>
    </div>
  );
});
