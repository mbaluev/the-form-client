import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { guid } from '@utils/guid/guid';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { INotifyItem } from '@model/common/notify';
import { VariantType } from 'notistack';
import { BaseViewModel } from 'controller/viewModel/modules/base/base';
import { SStorage } from '@utils/storage/storage';

@injectable()
export class NotifyViewModel extends BaseViewModel implements INotifyViewModel {
  constructor() {
    super();
    makeObservable(this, {
      items: observable,
      setItems: action,
      setItem: action,
      add: action,
      remove: action,
      parseError: action,
    });
  }

  items: INotifyItem[] | undefined = undefined;

  setItems = (data?: INotifyItem[]) => {
    this.items = data;
  };

  setItem = (item: INotifyItem) => {
    const items = this.items ? [...this.items] : [];
    items.push(item);
    this.setItems(items);
  };

  add = (variant: VariantType, title: string, message?: string) => {
    const data: INotifyItem = {
      guid: guid(),
      title,
      variant,
      message,
    };
    this.setItem(data);
  };

  remove = (id: string) => {
    const items = this.items?.filter((d) => d.guid !== id);
    this.setItems(items);
  };

  parseError = (error: any) => {
    let message;
    if (error.response) {
      message = error.response.statusText;
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
    } else {
      message = error.message;
    }
    if (!message) message = error;
    return message;
  };

  // --- override

  setOpen = (value: boolean) => {
    super.setOpen(value);
    SStorage.notifyState = value;
  };
}
