import { injectable } from 'inversify';
import NProgress from 'nprogress';
import { IAppViewModel } from '@viewModel/modules/common/app/interface';
import { BaseViewModel } from 'controller/viewModel/modules/base/base';

@injectable()
export class AppViewModel extends BaseViewModel implements IAppViewModel {
  private url?: string;

  routeChangeStart = async (url: string) => {
    this.setLoading(true);
    this.url = url;
    NProgress.start();
  };

  routeChangeComplete = async (url: string) => {
    this.url = url;
    this.setLoading(false);
    NProgress.done();
  };
}
