import NProgress from 'nprogress';
import { injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import type IAppStore from '@store/modules/common/app/interface';

@injectable()
export class AppStore extends BaseStore implements IAppStore {
  routeChangeStart = async () => {
    this.setLoading(true);
    NProgress.start();
  };

  routeChangeComplete = async () => {
    this.setLoading(false);
    NProgress.done();
  };
}
