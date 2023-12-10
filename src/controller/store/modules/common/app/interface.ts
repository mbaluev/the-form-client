import type IBaseStore from '@store/modules/base/store/interface';

export default interface IAppStore extends IBaseStore {
  routeChangeStart: () => Promise<void>;
  routeChangeComplete: () => Promise<void>;
}
