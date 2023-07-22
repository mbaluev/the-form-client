import { injectable } from 'inversify';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { ModuleBaseViewModel } from '@viewModel/modules/entities/module/base';

@injectable()
export class ModuleAdminViewModel
  extends ModuleBaseViewModel
  implements IModuleAdminViewModel {}
