import { injectable } from 'inversify';
import { action, makeObservable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import { LStorage } from '@utils/storage';
import type IMenuStore from '@store/modules/common/menu/interface';

@injectable()
export class MenuStore extends BaseStore implements IMenuStore {
  constructor() {
    super();
    makeObservable(this, {
      init: action,
      open: action,
    });
  }

  init = () => {
    if (LStorage && LStorage.menuState !== undefined) {
      this.setOpen(LStorage.menuState);
    }
  };

  open = (value: boolean) => {
    this.setOpen(value);
    LStorage.menuState = value;
  };
}
