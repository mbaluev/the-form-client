import { IBaseViewModel } from '../base/interface';

export interface IAppViewModel extends IBaseViewModel {
  routeChangeStart: (url: string) => void;
  routeChangeComplete: (url: string) => void;
}
