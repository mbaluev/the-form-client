import type { INotifyItem } from '@model/common/notify';
import type { AlertProps } from '@mui/material';

export default interface INotifyStore {
  items?: INotifyItem[];
  add: (error: any, severity?: AlertProps['severity']) => void;
  remove: (guid: string) => void;
  parseError: (error: any) => string;
  clear: () => void;
}
