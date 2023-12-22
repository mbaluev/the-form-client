import { inject, injectable } from 'inversify';
import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import { LStorage } from '@utils/storage';
import type IMenuStore from '@store/modules/common/menu/interface';
import { isAccess } from '@ui/layout/menu/isAccess';
import { STORE } from '@store/ids';
import type IAuthStore from '@store/modules/common/auth/interface';
import { MENU_CONFIG } from '@settings/menu';
import { IMenuItemDTO } from '@model/common/menu';

@injectable()
export class MenuStore extends BaseStore implements IMenuStore {
  @inject(STORE.Auth) private authStore!: IAuthStore;

  constructor() {
    super();
    makeObservable(this, {
      init: action,
      open: action,
      items: observable,
      setItems: action,
      hasAccess: computed,
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

  items: IMenuItemDTO[] = MENU_CONFIG;

  setItems = (value: IMenuItemDTO[]) => (this.items = value);

  setItemOpen = (name: string, value: boolean) => {
    const items = [...this.items];
    items.forEach((d) => {
      if (d.name === name && 'items' in d) {
        d.open = value;
      }
    });
  };

  get hasAccess() {
    let res = false;
    this.items.forEach((item) => {
      if (isAccess(this.authStore.roles, item.roles)) {
        res = true;
      }
    });
    return res;
  }
}
