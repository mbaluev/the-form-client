import { IBaseViewModel } from '@viewModel/modules/base/base/interface';

export interface IAppViewModel extends IBaseViewModel {
  routeChangeStart: (url: string) => Promise<void>;
  routeChangeComplete: (url: string) => Promise<void>;
}
