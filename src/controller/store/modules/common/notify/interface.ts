import type { INotifyItem } from '@model/common/notify';
import type { AlertProps } from '@mui/material';
import type IBaseStore from '@store/modules/base/store/interface';

export default interface INotifyStore extends IBaseStore {
  duration: number;
  items?: INotifyItem[];
  add: (error: any, severity?: AlertProps['severity']) => void;
  remove: (guid: string) => void;
  parseError: (error: any) => string;
  clear: () => void;

  init: () => void;
}
