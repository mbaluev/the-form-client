import { injectable } from 'inversify';
import { IModuleDTO } from '@model/entities/module';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

@injectable()
export class ModuleUserViewModel
  extends BaseCardViewModel<IModuleDTO>
  implements IModuleUserViewModel {}
