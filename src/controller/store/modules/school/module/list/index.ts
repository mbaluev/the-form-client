import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IModuleUserDTO } from '@model/entities/module';
import type IModuleService from '@service/modules/entities/module/interface';
import type IModuleSchoolListStore from '@store/modules/school/module/list/interface';

@injectable()
export class ModuleSchoolListStore
  extends BaseListStore<IModuleUserDTO>
  implements IModuleSchoolListStore
{
  @inject(SERVICE.Module) private moduleService!: IModuleService;

  getData = async () => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.moduleService.getModulesUser();
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
          d.module?.title?.toLowerCase()?.includes(searchText || '') ||
          d.module?.name?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.sort((a, b) => (a.module && b.module && a.module.position > b.module.position ? 1 : 0));
  }

  filterName = 'query_module_school';
}
