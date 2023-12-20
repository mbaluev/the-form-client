import { inject, injectable } from 'inversify';
import { action, computed, makeObservable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import { LStorage } from '@utils/storage';
import type IMenuStore from '@store/modules/common/menu/interface';
import { isAccess } from '@ui/layout/menu/isAccess';
import { STORE } from '@store/ids';
import type IAuthStore from '@store/modules/common/auth/interface';
import { MENU_CONFIG } from '@settings/menu';

@injectable()
export class MenuStore extends BaseStore implements IMenuStore {
  @inject(STORE.Auth) private authStore!: IAuthStore;

  constructor() {
    super();
    makeObservable(this, {
      init: action,
      open: action,
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

  get hasAccess() {
    let res = false;
    MENU_CONFIG.forEach((item) => {
      if (isAccess(this.authStore.roles, item.roles)) {
        res = true;
      }
    });
    debugger;
    return res;
  }
}
