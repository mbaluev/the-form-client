import { DependencyList, ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react';
import IBaseListStore, { TListITem } from '@store/modules/base/list/interface';
import { VirtualizeItem } from '@ui/layout/virtualize/item/item';
import { VirtualizeSkeleton } from '@ui/layout/virtualize/item/skeleton';
import { BtnDelete } from '@ui/layout/list/btnDelete';
import { VirtualizeBlock } from '@ui/layout/virtualize/block';
import { VirtualizeNoData } from '@ui/layout/virtualize/item/nodata';

export interface IListBaseProps<T extends TListITem> {
  dataModel: IBaseListStore<T>;
}

interface IListProps<T extends TListITem> extends IListBaseProps<T> {
  dependencies?: DependencyList;
  itemRenderer: (item: T) => ReactElement;
  avatarRenderer?: (item: T) => ReactElement;
  moreRenderer?: (item: T) => ReactElement;
  handleClick?: (id: string) => void;
  handleDelete?: (item: T) => void;
  checkbox?: boolean;
}

export const List = observer(<T extends TListITem>(props: IListProps<T>) => {
  const {
    dataModel,
    dependencies,
    itemRenderer,
    avatarRenderer,
    moreRenderer,
    handleClick,
    handleDelete,
    checkbox,
  } = props;
  const { dataFiltered, dataLength, isLoading, setData, getData, selectItem } = dataModel;

  useEffect(() => {
    getData();
    return () => setData();
  }, dependencies || []);

  return (
    <VirtualizeBlock
      data={dataFiltered}
      dataLength={dataLength}
      estimateSize={38}
      isLoading={isLoading}
      rowRenderer={(item: T) => (
        <VirtualizeItem
          id={item.id as string}
          avatar={avatarRenderer ? avatarRenderer(item) : undefined}
          content={itemRenderer(item)}
          more={
            handleDelete ? (
              <BtnDelete handleDelete={() => handleDelete(item)} />
            ) : moreRenderer ? (
              moreRenderer(item)
            ) : undefined
          }
          selected={Boolean(item.selected)}
          selectItem={checkbox ? selectItem : undefined}
          onClick={handleClick ? () => handleClick(item.id as string) : undefined}
          loading={item.loading}
        />
      )}
      rowSkeleton={<VirtualizeSkeleton />}
      rowNoData={<VirtualizeNoData />}
    />
  );
});
