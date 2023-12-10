import { VirtualizeFilter } from '@ui/layout/virtualize/filter';
import { TListITem } from '@store/modules/base/list/interface';
import { IListBaseProps } from '@ui/layout/list/list';

interface IProps<T extends TListITem> extends IListBaseProps<T> {
  padding?: boolean;
}

export const Filter = <T extends TListITem>(props: IProps<T>) => {
  const { dataModel, padding } = props;
  return (
    <VirtualizeFilter
      padding={padding}
      filterSearchName={dataModel.filterName}
    />
  );
};
