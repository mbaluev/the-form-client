import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IModuleDTO } from '@model/entities/module';
import { action, makeObservable, observable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import type IModuleStore from '@store/modules/_/module/interface';
import type IModuleService from '@service/modules/entities/module/interface';

@injectable()
export class ModuleStore extends BaseCardStore<IModuleDTO> implements IModuleStore {
  @inject(SERVICE.Module) protected serviceModule!: IModuleService;

  constructor() {
    super();
    makeObservable(this, {
      moduleData: observable,
      setModuleData: action,
      clearModuleData: action,
    });
    this.setValidations([
      { nameSpace: 'title', type: 'required', message: 'Required' },
      { nameSpace: 'name', type: 'required', message: 'Required' },
      { nameSpace: 'position', type: 'required', message: 'Required' },
    ]);
  }

  // --- observable

  moduleData?: IModuleDTO | null = undefined;

  setModuleData = (data?: IModuleDTO | null) => {
    this.moduleData = data;
  };

  clearModuleData = async () => {
    try {
      this.setModuleData();
    } catch (err) {
    } finally {
    }
  };

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.serviceModule.getModules(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceModule.getModule(id, query);
      this.setData(data);
      this.setModuleData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const data = await this.serviceModule.saveModule(this.data);
        await this.getList();
        await this.clearChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const data = await this.serviceModule.saveModule(this.modalData);
        await this.getList();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.serviceModule.deleteModules(this.deleteIds);
        await this.getList();
        await this.clearDelete();
        await this.clearData();
        await this.clearModuleData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
