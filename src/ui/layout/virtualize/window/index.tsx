import { CSSProperties, ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import classes from './index.module.scss';

interface IProps<T> {
  data?: T[];
  dataLength: number;
  estimateSize: number;
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  rowRenderer: (item: T) => ReactElement;
  rowSkeleton?: ReactElement;
  rowNoData?: ReactElement;
}

export const VirtualizeWindow = observer(<T,>(props: IProps<T>) => {
  const {
    data,
    dataLength,
    estimateSize,
    isLoading,
    hasNextPage,
    fetchNextPage,
    rowRenderer,
    rowSkeleton,
    rowNoData,
  } = props;

  const isExtraItem = isLoading || !dataLength;
  const virtualize = useWindowVirtualizer({
    count: isExtraItem ? dataLength + 1 : dataLength,
    estimateSize: () => estimateSize,
    overscan: 5,
  });
  const items = virtualize.getVirtualItems();

  useEffect(() => {
    const [last] = [...items].reverse();
    if (!last) return;
    if (last.index >= dataLength - 1 && hasNextPage && fetchNextPage && !isLoading) fetchNextPage();
  }, [hasNextPage, isLoading, items]);

  const styleParent: CSSProperties = {
    height: virtualize.getTotalSize(),
  };
  const styleGrid: CSSProperties = {
    transform: `translateY(${items[0].start}px)`,
  };

  return (
    <div className={classes.list_parent} style={styleParent}>
      <div className={classes.list_grid} style={styleGrid}>
        {items.map((virtualRow) => {
          const isExtraRow = virtualRow.index > dataLength - 1;
          if (isExtraRow && isLoading) {
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualize.measureElement}
              >
                {rowSkeleton || 'Loading'}
              </div>
            );
          }
          if (isExtraRow && !isLoading) {
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualize.measureElement}
              >
                {rowNoData || 'Not found'}
              </div>
            );
          }
          const item = data?.[virtualRow.index];
          if (!item) {
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualize.measureElement}
              >
                {rowNoData || 'Not found'}
              </div>
            );
          }
          return (
            <div key={virtualRow.key} data-index={virtualRow.index} ref={virtualize.measureElement}>
              {rowRenderer(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
});
