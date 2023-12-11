import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { IMenuStore } from '@store/modules/common/menu/interface';
import { BaseStore } from '@store/modules/base/store';
import { LStorage } from '@utils/storage';

@injectable()
export class MenuStore extends BaseStore implements IMenuStore {
  constructor() {
    super();
    makeObservable(this, {
      initiated: observable,
      setInitiated: action,
      initiate: action,
      open: action,
    });
  }

  initiated = false;

  setInitiated = (value: boolean) => {
    this.initiated = value;
  };

  initiate = () => {
    if (LStorage && LStorage.menuState !== undefined) {
      this.setOpen(LStorage.menuState);
    }
    setTimeout(() => this.setInitiated(true));
  };

  open = (value: boolean) => {
    this.setOpen(value);
    LStorage.menuState = value;
  };
}
