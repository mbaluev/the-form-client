import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react';
import IBaseListStore, { TListITem } from '@store/modules/base/list/interface';
import { VirtualizeWindow } from '@ui/layout/virtualize/window';
import { VirtualizeItem } from '@ui/layout/virtualize/item/item';
import { VirtualizeSkeleton } from '@ui/layout/virtualize/item/skeleton';
import { VirtualizeNoData } from '@ui/layout/virtualize/item/nodata';
import { BtnMore } from '@ui/layout/list/btnMore';
import { BtnDelete } from '@ui/layout/list/btnDelete';

export interface IListBaseProps<T extends TListITem> {
  dataModel: IBaseListStore<T>;
}

interface IListProps<T extends TListITem> extends IListBaseProps<T> {
  dependencies?: React.DependencyList;
  itemRenderer: (item: T) => ReactElement;
  avatarRenderer?: (item: T) => ReactElement;
  moreRenderer?: (item: T) => ReactElement;
  handleClick?: (id: string) => void;
  handleDelete?: (item: T) => void;
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
  } = props;
  const { dataFiltered, dataLength, isLoading, setData, getData, selectItem } = dataModel;

  useEffect(() => {
    getData();
    return () => setData();
  }, dependencies || []);

  return (
    <VirtualizeWindow
      data={dataFiltered}
      dataLength={dataLength}
      estimateSize={70}
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
            ) : (
              <BtnMore />
            )
          }
          selected={Boolean(item.selected)}
          selectItem={selectItem}
          onClick={handleClick ? () => handleClick(item.id as string) : undefined}
          loading={item.loading}
        />
      )}
      rowSkeleton={<VirtualizeSkeleton />}
      rowNoData={<VirtualizeNoData />}
    />
  );
});
