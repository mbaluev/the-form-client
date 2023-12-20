import NProgress from 'nprogress';
import { inject, injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import { STORE } from '@store/ids';
import type IAppStore from '@store/modules/common/app/interface';
import type IAuthStore from '@store/modules/common/auth/interface';
import type IMenuStore from '@store/modules/common/menu/interface';

@injectable()
export class AppStore extends BaseStore implements IAppStore {
  @inject(STORE.Auth) protected authStore!: IAuthStore;

  @inject(STORE.Menu) protected menuStore!: IMenuStore;

  constructor() {
    super();
    this.setLoading(true);
  }

  init = async () => {
    try {
      this.authStore.init();
      this.menuStore.init();
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  routeChangeStart = async () => {
    NProgress.start();
  };

  routeChangeComplete = async () => {
    NProgress.done();
  };
}
