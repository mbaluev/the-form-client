import type IBaseStore from '@store/modules/base/store/interface';

export default interface IMenuStore extends IBaseStore {
  init: () => void;
  open: (value: boolean) => void;
  hasAccess: boolean;
}
