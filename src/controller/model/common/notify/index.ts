import type { AlertProps } from '@mui/material';

export interface INotifyItem {
  guid: string;
  message: string;
  severity?: AlertProps['severity'];
}
