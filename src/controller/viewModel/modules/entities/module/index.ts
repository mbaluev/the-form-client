import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IModuleDTO } from '@model/entities/module';
import { ModuleService } from 'controller/service/modules/entities/module';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { VIEW_MODEL } from '@viewModel/ids';
import { FilterViewModel } from '@viewModel/modules/common/filter';

@injectable()
export class ModuleViewModel
  extends BaseCardViewModel<IModuleDTO>
  implements IModuleViewModel
{
  @inject(SERVICE.Module) protected serviceModule!: ModuleService;

  @inject(VIEW_MODEL.Filter) protected filters!: FilterViewModel;

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

  getList = async () => {
    this.setListLoading(true);
    try {
      const data = await this.serviceModule.getModules(this.filters.filters);
      this.setList(data);
    } catch (err) {
    } finally {
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
