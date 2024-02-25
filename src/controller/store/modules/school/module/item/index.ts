import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IModuleUserDTO } from '@model/entities/module';
import type IModuleSchoolItemStore from '@store/modules/school/module/item/interface';
import type IModuleService from '@service/modules/entities/module/interface';

@injectable()
export class ModuleSchoolItemStore
  extends BaseCardStore<IModuleUserDTO>
  implements IModuleSchoolItemStore
{
  @inject(SERVICE.Module) private moduleService!: IModuleService;

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.moduleService.getModulesUser(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.moduleService.getModuleUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
