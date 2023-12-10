import { observer } from 'mobx-react';
import { VirtualizeToolbar } from '@ui/layout/virtualize/toolbar';
import { TListITem } from '@store/modules/base/list/interface';
import { IListBaseProps } from '@ui/layout/list/list';
import { BtnReload } from '@ui/layout/list/btnReload';
import { BtnCreate } from '@ui/layout/list/btnCreate';

interface IProps<T extends TListITem> extends IListBaseProps<T> {
  padding?: boolean;
  handleCreate?: () => Promise<void>;
}

export const Toolbar = observer(<T extends TListITem>(props: IProps<T>) => {
  const { dataModel, padding, handleCreate } = props;

  const { isLoading, dataLength, dataTotal, selectedItems, selectAllItems, allItemsSelected } =
    dataModel;

  return (
    <VirtualizeToolbar
      padding={padding}
      isLoading={isLoading}
      dataLength={dataLength}
      dataTotal={dataTotal}
      dataSelected={selectedItems}
      dataSelectAll={selectAllItems}
      dataAllSelected={allItemsSelected}
      refreshAction={<BtnReload dataModel={dataModel} />}
      more={handleCreate ? <BtnCreate handleCreate={handleCreate} /> : undefined}
      checkbox
    />
  );
});
