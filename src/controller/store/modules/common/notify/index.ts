import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import { v4 } from 'uuid';
import type { AlertProps } from '@mui/material';
import type INotifyStore from '@store/modules/common/notify/interface';
import type { INotifyItem } from '@model/common/notify';

@injectable()
export class NotifyStore extends BaseStore implements INotifyStore {
  constructor() {
    super();
    makeObservable(this, {
      items: observable,
      setItems: action,
      add: action,
      remove: action,
      clear: action,
    });
  }

  duration = 3000000;

  items: INotifyItem[] | undefined = undefined;

  setItems = (data?: INotifyItem[]) => {
    this.items = data;
  };

  add = (error: any, severity?: AlertProps['severity']) => {
    const items = this.items ? [...this.items] : [];
    const item = {
      guid: v4(),
      message: this.parseError(error),
      severity,
    };
    items.push(item);
    this.setItems(items);
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

  test = () => {
    const message =
      "Material UI is an open-source React component library that implements Google's Material Design.\n" +
      'Material UI is beautiful by design and features a suite of customization options that make it easy to implement your own custom design system on top of our components.';
    this.add(message, 'info');
    this.add(message, 'success');
    this.add(message, 'warning');
    this.add(message, 'error');
  };
}
