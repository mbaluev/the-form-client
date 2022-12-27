import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IModuleDTO } from '@model/module';
import { ModuleService } from '@service/modules/module';
import { BlockService } from '@service/modules/block';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { action, makeObservable, observable } from 'mobx';

@injectable()
export class ModuleViewModel
  extends BaseCardViewModel<IModuleDTO>
  implements IModuleViewModel
{
  @inject(SERVICE.Module) protected serviceModule!: ModuleService;

  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

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
    } finally {
    }
  };

  // --- override

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const data = await this.serviceModule.saveModule(this.data);
        this.updateFromList(data);
        await this.clearChanges();
        return data;
      }
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const data = await this.serviceModule.saveModule(this.modalData);
        this.updateFromList(data);
        await this.clearModalChanges();
        return data;
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.serviceModule.deleteModules(this.deleteIds);
        this.removeFromList(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
