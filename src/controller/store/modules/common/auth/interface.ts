import type IBaseStore from '@store/modules/base/store/interface';

export default interface IAuthStore extends IBaseStore {
  init: () => Promise<void>;
  token: Promise<string>;
  isAuth: boolean;
}
