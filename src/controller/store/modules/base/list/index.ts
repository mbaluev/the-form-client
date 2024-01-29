import { action, computed, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { STORE } from '@store/ids';
import { BaseStore } from '@store/modules/base/store';
import type IFilterStore from '@store/modules/common/filter/interfaces';
import type IBaseListStore from '@store/modules/base/list/interface';
import type { TListITem } from '@store/modules/base/list/interface';

@injectable()
export class BaseListStore<T extends TListITem> extends BaseStore implements IBaseListStore<T> {
  @inject(STORE.Filter) readonly filterStore!: IFilterStore;

  constructor() {
    super();
    makeObservable(this, {
      // page
      pageNumber: observable,
      setPageNumber: action,
      pageHasNext: observable,
      setPageHasNext: action,

      // data
      data: observable,
      setData: action,
      getData: action,
      dataItems: computed,

      // item:
      setItemLoading: action,
      setItemError: action,

      // computed
      dataFiltered: computed,
      dataLength: computed,
      dataTotal: computed,

      // selected
      selectItem: action,
      selectAllItems: action,
      deselectAllItems: action,
      selectedItems: computed,
      allItemsSelected: computed,
    });
  }

  // page

  pageSize = 20;

  pageNumber = 0;

  setPageNumber = (value: number) => (this.pageNumber = value);

  pageHasNext = false;

  setPageHasNext = (value: boolean) => (this.pageHasNext = value);

  // contracts

  data?: T[] = undefined;

  setData = (value?: T[]) => (this.data = value);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getData() {}

  resetData = () => {
    this.setData();
    this.setPageNumber(0);
    this.setPageHasNext(true);
  };

  get dataItems() {
    return this.data
      ?.slice()
      ?.sort(
        (a, b) =>
          Number(a.position) - Number(b.position) ||
          (a.name && b.name ? a.name.localeCompare(b.name) : 0)
      )
      ?.map((d) => ({
        value: d.id,
        label: d.title,
      }));
  }

  // computed

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data
      ?.filter((d) => {
        return (
          d.id?.toLowerCase()?.includes(searchText || '') ||
          d.name?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.slice()
      ?.sort(
        (a, b) =>
          Number(a.position) - Number(b.position) ||
          (a.name && b.name ? a.name.localeCompare(b.name) : 0)
      );
  }

  get dataLength() {
    return this.dataFiltered?.length || 0;
  }

  get dataTotal() {
    return this.data?.length || 0;
  }

  // item

  setItemLoading = (id?: string | null, value?: boolean) => {
    const items: T[] | undefined = this.data ? JSON.parse(JSON.stringify(this.data)) : undefined;
    items?.forEach((d) => (d.loading = d.id === id ? value : d.loading));
    this.setData(items);
  };

  setItemError = (id?: string | null, value?: string) => {
    const items: T[] | undefined = this.data ? JSON.parse(JSON.stringify(this.data)) : undefined;
    items?.forEach((d) => {
      if (d.id === id) d.error = value;
    });
    this.setData(items);
  };

  // selected

  selectItem = (key: string) => {
    const data = this.data ? [...this.data] : undefined;
    data?.forEach((d) => {
      if (d.id === key) d.selected = !d.selected;
    });
    this.setData(data);
  };

  selectAllItems = () => {
    const data = this.data ? [...this.data] : undefined;
    if (data) {
      if (this.allItemsSelected) {
        this.deselectAllItems();
      } else {
        data.forEach((d) => (d.selected = true));
      }
    }
    this.setData(data);
  };

  deselectAllItems = () => {
    const data = this.data ? [...this.data] : undefined;
    data?.forEach((d) => delete d.selected);
    this.setData(data);
  };

  get selectedItems() {
    return this.data?.filter((d) => d.selected)?.map((d) => d.id);
  }

  get allItemsSelected() {
    return Boolean(
      this.selectedItems && this.data && this.selectedItems.length === this.data.length
    );
  }

  // filter

  filterName = 'search';
}
