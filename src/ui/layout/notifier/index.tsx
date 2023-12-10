import { observer } from 'mobx-react';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { INotifyItem } from '@model/common/notify';
import { Notify } from '@ui/layout/notifier/notify';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Fragment } from 'react';

export const Notifier = observer(() => {
  const { items } = useNotifyStore();
  if (!items || items.length === 0) return null;
  return (
    <Stack id="__notifier" sx={{ zIndex: 1 }}>
      {items?.map((item: INotifyItem) => (
        <Fragment key={item.guid}>
          <Notify item={item} />
          <Divider />
        </Fragment>
      ))}
    </Stack>
  );
});
