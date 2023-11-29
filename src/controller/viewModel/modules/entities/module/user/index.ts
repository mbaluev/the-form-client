import { injectable } from 'inversify';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { ModuleBaseViewModel } from '@viewModel/modules/entities/module/base';

@injectable()
export class ModuleUserViewModel
  extends ModuleBaseViewModel
  implements IModuleUserViewModel
{
  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      const token = await this.auth.verify();
      const data = await this.serviceModule.getModulesUser(undefined, token);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id: string) => {
    this.setDataLoading(true);
    try {
      const token = await this.auth.verify();
      const data = await this.serviceModule.getModuleUser(id, undefined, token);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
