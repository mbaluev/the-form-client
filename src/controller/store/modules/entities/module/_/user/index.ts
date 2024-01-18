import { injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { ModuleBaseStore } from '@store/modules/entities/module/_/base';
import type IModuleUserStore from '@store/modules/entities/module/_/user/interface';

@injectable()
export class ModuleUserStore extends ModuleBaseStore implements IModuleUserStore {
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
