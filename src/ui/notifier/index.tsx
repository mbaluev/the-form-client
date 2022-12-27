import { withSnackbar } from 'notistack';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Alert } from '@components/alert';
import { NOTIFY_DURATION } from '@model/notify';

export const Notifier = withSnackbar(
  observer(() => {
    const { items, remove } = useViewModel<INotifyViewModel>(VIEW_MODEL.Notify);
    const { enqueueSnackbar } = useSnackbar();

    const [displayed, setDisplayed] = useState<string[]>([]);

    const storeDisplayed = (guid: string) => {
      setDisplayed([...displayed, guid]);
    };

    useEffect(() => {
      items?.forEach((item) => {
        if (displayed.includes(item.guid)) return;
        enqueueSnackbar(item.message, {
          autoHideDuration: NOTIFY_DURATION,
          variant: item.variant,
          content: (
            <Alert
              type={item.variant}
              message={item.message}
              title={item.title}
            />
          ),
        });
        storeDisplayed(item.guid);
        remove(item.guid);
      });
    }, [items]);

    return null;
  })
);
