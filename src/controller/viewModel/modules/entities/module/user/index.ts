import { injectable } from 'inversify';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { ModuleBaseViewModel } from '@viewModel/modules/entities/module/base';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class ModuleUserViewModel
  extends ModuleBaseViewModel
  implements IModuleUserViewModel
{
  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      const data = await this.serviceModule.getModulesUser(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceModule.getModuleUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  getDataByBlockId = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceModule.getModuleUserByBlockId(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
