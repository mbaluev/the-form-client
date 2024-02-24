import _ from 'lodash';
import { injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { IModuleUserDTO } from '@model/entities/module';
import { ModuleBaseStore } from '@store/modules/_/module/base';
import type IModuleAdminStore from '@store/modules/_/module/admin/interface';

@injectable()
export class ModuleAdminStore extends ModuleBaseStore implements IModuleAdminStore {
  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IModuleUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'module.title')) {
          result =
            result ||
            (item.module?.title !== undefined &&
              item.module.title !== null &&
              item.module.title.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'module.name')) {
          result =
            result ||
            (item.module?.name !== undefined &&
              item.module.name !== null &&
              item.module.name.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    await this.clearData();
    this.setDataLoading(true);
    try {
      const data = await this.serviceModule.getModuleAdmin(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  getList = async (query?: ParsedUrlQuery) => {
    await this.clearList();
    this.setListLoading(true);
    try {
      const data = await this.serviceModule.getModulesAdmin(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };
}
