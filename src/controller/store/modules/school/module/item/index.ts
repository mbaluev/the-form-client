import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IModuleUserDTO } from '@model/entities/module';
import type IModuleSchoolItemStore from '@store/modules/school/module/item/interface';
import type IModuleService from '@service/modules/entities/module/interface';
import { action, makeObservable } from 'mobx';

@injectable()
export class ModuleSchoolItemStore
  extends BaseCardStore<IModuleUserDTO>
  implements IModuleSchoolItemStore
{
  @inject(SERVICE.Module) private moduleService!: IModuleService;

  constructor() {
    super();
    makeObservable(this, {
      getDataByBlockId: action,
    });
  }

  // --- override

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

  getDataByBlockId = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.moduleService.getModuleUserByBlockId(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
