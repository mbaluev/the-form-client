import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IModuleDTO } from '@model/entities/module';
import type IModuleItemStore from '@store/modules/entities/module/item/interface';
import type IModuleService from '@service/modules/entities/module/interface';

@injectable()
export class ModuleItemStore extends BaseCardStore<IModuleDTO> implements IModuleItemStore {
  @inject(SERVICE.Module) private moduleService!: IModuleService;

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.moduleService.getModules(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.moduleService.getModule(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async (data?: IModuleDTO) => {
    this.setSaveLoading(true);
    try {
      if (data) {
        const res = await this.moduleService.saveModule(data);
        this.setData(res);
        return res;
      }
    } catch (err) {
    } finally {
      this.setSaveLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.moduleService.deleteModules(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
