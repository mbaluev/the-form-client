import { VirtualizeFilter } from '@ui/layout/virtualize/filter';
import { useBlockListStore } from '@store/modules/entities/block/list/useBlockListStore';
import { FilterSelect } from '@ui/filter/filterSelect';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';
import { observer } from 'mobx-react';

export const Filter = observer(() => {
  const { dataItems } = useModuleListStore();
  const dataModel = useBlockListStore();
  const filter = (
    <FilterSelect name="moduleId" placeholder="Module" items={dataItems} sx={{ width: '100%' }} />
  );
  return <VirtualizeFilter padding filterSearchName={dataModel.filterName} filter={filter} />;
});
