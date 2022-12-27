import { IBaseViewModel } from '@viewModel/modules/base/interface';

export interface IMenuViewModel extends IBaseViewModel {
  initiated: boolean;
  initiate: () => void;
}
