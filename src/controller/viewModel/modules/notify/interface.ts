import { INotifyItem } from '@model/notify';
import { VariantType } from 'notistack';
import { IBaseViewModel } from '@viewModel/modules/base/interface';

export interface INotifyViewModel extends IBaseViewModel {
  items?: INotifyItem[];
  add: (variant: VariantType, message: string, title?: string) => void;
  remove: (guid: string) => void;
  parseError: (error: any) => string;
}
