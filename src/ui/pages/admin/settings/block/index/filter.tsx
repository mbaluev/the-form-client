import { VirtualizeFilter } from '@ui/layout/virtualize/filter';
import { useBlockSettingsListStore } from '@store/modules/settings/block/settings/list/hook';
import { FilterSelect } from '@ui/filter/filterSelect';
import { useModuleSettingsListStore } from '@store/modules/settings/module/settings/list/hook';
import { observer } from 'mobx-react';

export const Filter = observer(() => {
  const { dataItems } = useModuleSettingsListStore();
  const dataModel = useBlockSettingsListStore();
  const filter = (
    <FilterSelect name="moduleId" placeholder="Module" items={dataItems} sx={{ width: '100%' }} />
  );
  return <VirtualizeFilter padding filterSearchName={dataModel.filterName} filter={filter} />;
});
