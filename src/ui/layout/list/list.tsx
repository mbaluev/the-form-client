import { CSSProperties, DependencyList, ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react';
import IBaseListStore, { TListITem } from '@store/modules/base/list/interface';
import { VirtualizeItem } from '@ui/layout/virtualize/item/item';
import { VirtualizeSkeleton } from '@ui/layout/virtualize/item/skeleton';
import { VirtualizeBlock } from '@ui/layout/virtualize/block';
import { VirtualizeNoData } from '@ui/layout/virtualize/item/nodata';
import { ParsedUrlQuery } from 'querystring';

export interface IListBaseProps<T extends TListITem> {
  dataModel: IBaseListStore<T>;
  query?: ParsedUrlQuery;
}

interface IListProps<T extends TListITem> extends IListBaseProps<T> {
  dependencies?: DependencyList;
  itemRenderer: (item: T) => ReactElement;
  avatarRenderer?: (item: T) => ReactElement;
  moreRenderer?: (item: T) => ReactElement;
  rowStyleGetter?: (item: T) => CSSProperties | undefined;
  handleClick?: (id: string) => void;
  checkbox?: boolean;
  estimateSize: number;
  query?: ParsedUrlQuery;
}

export const List = observer(<T extends TListITem>(props: IListProps<T>) => {
  const {
    dataModel,
    dependencies,
    itemRenderer,
    avatarRenderer,
    moreRenderer,
    rowStyleGetter,
    handleClick,
    checkbox,
    estimateSize,
    query,
  } = props;
  const { dataFiltered, dataLength, isLoading, getData, selectItem } = dataModel;

  useEffect(() => {
    getData(query);
  }, dependencies || []);

  return (
    <VirtualizeBlock
      data={dataFiltered}
      dataLength={dataLength}
      estimateSize={estimateSize}
      isLoading={isLoading}
      rowRenderer={(item: T) => (
        <VirtualizeItem
          id={item.id as string}
          avatar={avatarRenderer ? avatarRenderer(item) : undefined}
          content={itemRenderer(item)}
          more={moreRenderer ? moreRenderer(item) : undefined}
          selected={Boolean(item.selected)}
          selectItem={checkbox ? selectItem : undefined}
          onClick={handleClick ? () => handleClick(item.id as string) : undefined}
          loading={item.loading}
          rowStyle={rowStyleGetter ? rowStyleGetter(item) : undefined}
        />
      )}
      rowSkeleton={<VirtualizeSkeleton />}
      rowNoData={<VirtualizeNoData />}
    />
  );
});
