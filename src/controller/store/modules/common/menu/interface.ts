import type IBaseStore from '@store/modules/base/store/interface';
import { IMenuItemDTO } from '@model/common/menu';

export default interface IMenuStore extends IBaseStore {
  init: () => void;
  open: (value: boolean) => void;
  items: IMenuItemDTO[];
  hasAccess: boolean;
  setItemOpen: (name: string, value: boolean) => void;
}
