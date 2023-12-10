import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { guid } from '@utils/guid';
import type { AlertProps } from '@mui/material';
import type INotifyStore from '@store/modules/common/notify/interface';
import type { INotifyItem } from '@model/common/notify';

@injectable()
export class NotifyStore implements INotifyStore {
  constructor() {
    makeObservable(this, {
      items: observable,
      setItems: action,
      add: action,
      remove: action,
      clear: action,
    });
  }

  autoHide = false;

  autoHideDuration = 3000;

  items: INotifyItem[] | undefined = undefined;

  setItems = (data?: INotifyItem[]) => {
    this.items = data;
  };

  add = (error: any, severity?: AlertProps['severity']) => {
    const items = this.items ? [...this.items] : [];
    const item = {
      guid: guid(),
      message: this.parseError(error),
      severity,
    };
    items.push(item);
    this.setItems(items);
    if (this.autoHide) setTimeout(() => this.remove(item.guid), this.autoHideDuration);
  };

  remove = (id: string) => {
    const items = this.items?.filter((d) => d.guid !== id);
    this.setItems(items);
  };

  parseError = (error: any) => {
    let message = error?.detail;
    if (!message) message = error?.title;
    if (!message) message = error?.message;
    if (!message) message = error?.toString();
    if (!message) message = error;
    if (error?.status) message = `${error?.status} - ` + message;
    return message;
  };

  clear = () => this.setItems();
}
