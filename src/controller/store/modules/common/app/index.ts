import NProgress from 'nprogress';
import { inject, injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import { STORE } from '@store/ids';
import type IAppStore from '@store/modules/common/app/interface';
import type IAuthStore from '@store/modules/common/auth/interface';
import type INotifyStore from '@store/modules/common/notify/interface';

@injectable()
export class AppStore extends BaseStore implements IAppStore {
  @inject(STORE.Auth) protected authStore!: IAuthStore;

  @inject(STORE.Notify) protected notifyStore!: INotifyStore;

  init = async () => {
    this.setLoading(true);
    try {
      this.authStore.init();
      this.notifyStore.init();
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  routeChangeStart = async () => {
    this.setLoading(true);
    NProgress.start();
  };

  routeChangeComplete = async () => {
    this.setLoading(false);
    NProgress.done();
  };
}
