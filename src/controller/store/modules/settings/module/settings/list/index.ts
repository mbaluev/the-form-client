import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IModuleDTO } from '@model/entities/module';
import type IModuleService from '@service/modules/entities/module/interface';
import type IModuleSettingsListStore from '@store/modules/settings/module/settings/list/interface';

@injectable()
export class ModuleSettingsListStore
  extends BaseListStore<IModuleDTO>
  implements IModuleSettingsListStore
{
  @inject(SERVICE.Module) private moduleService!: IModuleService;

  getData = async () => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.moduleService.getModules();
      this.setData(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data
      ?.filter((d) => {
        return (
          d.title?.toLowerCase()?.includes(searchText || '') ||
          d.name?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.sort((a, b) => (a.position > b.position ? 1 : 0));
  }

  filterName = 'query_module';
}
