import type IBaseStore from '@store/modules/base/store/interface';
import type { ISelectItem } from '@components/fields/selectField/types';
import { ParsedUrlQuery } from 'querystring';

export type TListITem = {
  id?: string | null;
  title?: string | null;
  name?: string | null;
  position?: number | null;
  selected?: boolean | null;
  loading?: boolean | null;
  error?: string | null;
};

export default interface IBaseListStore<T extends TListITem> extends IBaseStore {
  // page
  pageSize: number;
  pageNumber: number;
  pageHasNext: boolean;

  // data
  data?: T[];
  setData: (value?: T[]) => void;
  getData: (query?: ParsedUrlQuery) => Promise<void>;
  resetData: () => void;
  dataItems?: ISelectItem[];

  // computed
  dataFiltered?: T[];
  dataLength: number;
  dataTotal: number;

  // item
  setItemLoading: (id?: string | null, value?: boolean) => void;
  setItemError: (id?: string | null, value?: string) => void;

  // selected
  selectItem: (id: string) => void;
  selectAllItems: () => void;
  selectedItems?: string[];
  allItemsSelected: boolean;
  deselectAllItems: () => void;
  hasSelected: boolean;

  // delete
  isDeleteOpen: boolean;
  isDeleteLoading: boolean;
  deleteOpen: () => Promise<void>;
  deleteClose: () => Promise<void>;
  deleteSubmit: () => Promise<boolean | undefined>;

  // filter
  filterName: string;
}
