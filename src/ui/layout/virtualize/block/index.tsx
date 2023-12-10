import { CSSProperties, ReactElement, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useVirtualizer } from '@tanstack/react-virtual';
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
  height?: number;
  width?: number;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const VirtualizeBlock = observer(<T,>(props: IProps<T>) => {
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
    height,
    width,
  } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const isExtraItem = isLoading || !dataLength;
  const virtualize = useVirtualizer({
    count: isExtraItem ? dataLength + 1 : dataLength,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
  });
  const items = virtualize.getVirtualItems();

  useEffect(() => {
    const [last] = [...items].reverse();
    if (!last) return;
    if (last.index >= dataLength - 1 && hasNextPage && !isLoading && fetchNextPage) fetchNextPage();
  }, [hasNextPage, isLoading, items]);

  const styleParent: CSSProperties = {
    height: height ? `${height}px` : undefined,
    width: width ? `${width}px` : undefined,
  };
  const styleGrid: CSSProperties = {
    height: virtualize.getTotalSize(),
  };

  return (
    <div className={classes.list_parent} ref={parentRef} style={styleParent}>
      <div className={classes.list_grid} style={styleGrid}>
        {items.map((virtualRow) => {
          const isExtraRow = virtualRow.index > dataLength - 1;
          const styleRow: CSSProperties = {
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          };
          if (isExtraRow) {
            if (isLoading) {
              return (
                <div key={virtualRow.key} className={classes.list_row} style={styleRow}>
                  {rowSkeleton || 'Loading'}
                </div>
              );
            } else {
              return (
                <div key={virtualRow.key} className={classes.list_row} style={styleRow}>
                  {rowNoData || 'Not found'}
                </div>
              );
            }
          }
          const item = data?.[virtualRow.index];
          if (!item) {
            return (
              <div key={virtualRow.key} className={classes.list_row} style={styleRow}>
                {rowNoData || 'Not found'}
              </div>
            );
          }
          return (
            <div key={virtualRow.key} className={classes.list_row} style={styleRow}>
              {rowRenderer(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
});
