import { withSnackbar } from 'notistack';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { Alert, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Notifier = withSnackbar(
  observer(() => {
    const { items, remove, duration } = useNotifyStore();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const theme = useTheme();

    const [displayed, setDisplayed] = useState<string[]>([]);

    const storeDisplayed = (guid: string) => {
      setDisplayed([...displayed, guid]);
    };

    useEffect(() => {
      items?.forEach((item) => {
        if (displayed.includes(item.guid)) return;
        enqueueSnackbar(item.message, {
          autoHideDuration: duration,
          variant: item.severity,
          key: item.guid,
          content: (
            <Alert
              variant="filled"
              severity={item.severity}
              action={
                <IconButton size="small" onClick={() => closeSnackbar(item.guid)}>
                  <CloseIcon sx={{ color: theme.palette.common.white }} />
                </IconButton>
              }
            >
              {item.message}
            </Alert>
          ),
        });
        storeDisplayed(item.guid);
        remove(item.guid);
      });
    }, [items]);

    return null;
  })
);
