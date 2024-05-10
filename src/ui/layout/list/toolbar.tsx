import { observer } from 'mobx-react';
import { VirtualizeToolbar } from '@ui/layout/virtualize/toolbar';
import { TListITem } from '@store/modules/base/list/interface';
import { IListBaseProps } from '@ui/layout/list/list';
import { BtnReload } from '@ui/layout/list/btnReload';
import { Actions } from '@ui/layout/list/actions';

interface IProps<T extends TListITem> extends IListBaseProps<T> {
  padding?: boolean;
  handleCreate?: () => Promise<void>;
  handleDelete?: () => Promise<void>;
  checkbox?: boolean;
}

export const Toolbar = observer(<T extends TListITem>(props: IProps<T>) => {
  const { dataModel, query, padding, handleCreate, handleDelete, checkbox } = props;

  const {
    isLoading,
    dataLength,
    dataTotal,
    selectedItems,
    selectAllItems,
    allItemsSelected,
    hasSelected,
  } = dataModel;

  return (
    <VirtualizeToolbar
      padding={padding}
      isLoading={isLoading}
      dataLength={dataLength}
      dataTotal={dataTotal}
      dataSelected={selectedItems}
      dataSelectAll={selectAllItems}
      dataAllSelected={allItemsSelected}
      refreshAction={<BtnReload dataModel={dataModel} query={query} />}
      more={
        <Actions
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          hasSelected={hasSelected}
        />
      }
      checkbox={checkbox}
    />
  );
});
