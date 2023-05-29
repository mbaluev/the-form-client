import { INotifyItem } from '@model/common/notify';
import { VariantType } from 'notistack';
import { IBaseViewModel } from '@viewModel/modules/base/base/interface';

export interface INotifyViewModel extends IBaseViewModel {
  items?: INotifyItem[];
  add: (variant: VariantType, title: string, message?: string) => void;
  remove: (guid: string) => void;
  parseError: (error: any) => string;
}
