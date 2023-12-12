import { observer } from 'mobx-react';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { Alert, AlertProps, Box, Container, IconButton, Stack, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { INotifyItem } from '@model/common/notify';
import { Copy } from '@components/copy';

const getColor = (severity?: AlertProps['severity']) => {
  const theme = useTheme();
  switch (severity) {
    case 'success':
      return theme.palette.success.main;
    case 'info':
      return theme.palette.info.main;
    case 'warning':
      return theme.palette.warning.main;
    case 'error':
      return theme.palette.error.main;
  }
};

export const Notify = observer((props: { item: INotifyItem }) => {
  const { item } = props;
  const { guid, message, severity = 'error' } = item;
  const { remove } = useNotifyStore();
  const handleClose = (id: string) => remove(id);
  return (
    <Box sx={{ backgroundColor: getColor(severity) }}>
      <Container maxWidth="xl">
        <Alert
          sx={{ pl: 1.5, pr: 1.5 }}
          severity={severity}
          action={
            <Stack direction="row" spacing={2}>
              <Copy size="small" text={message} />
              <IconButton size="small" onClick={() => handleClose(guid)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          }
        >
          {message}
        </Alert>
      </Container>
    </Box>
  );
});
