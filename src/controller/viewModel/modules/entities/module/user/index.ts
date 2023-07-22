import { injectable } from 'inversify';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { ModuleBaseViewModel } from '@viewModel/modules/entities/module/base';

@injectable()
export class ModuleUserViewModel
  extends ModuleBaseViewModel
  implements IModuleUserViewModel {}
