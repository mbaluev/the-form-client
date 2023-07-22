import { injectable } from 'inversify';
import { IModuleUserDTO } from '@model/entities/module';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IModuleBaseViewModel } from '@viewModel/modules/entities/module/base/interface';

@injectable()
export class ModuleBaseViewModel
  extends BaseCardViewModel<IModuleUserDTO>
  implements IModuleBaseViewModel {}
