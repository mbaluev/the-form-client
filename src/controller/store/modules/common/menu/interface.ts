import type IBaseStore from '@store/modules/base/store/interface';

export interface IMenuStore extends IBaseStore {
  initiated: boolean;
  initiate: () => void;
  open: (value: boolean) => void;
}
