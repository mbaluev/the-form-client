import { injectable } from 'inversify';
import { IModuleDTO } from '@model/module';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IModuleUserViewModel } from '@viewModel/modules/module/user/interface';

@injectable()
export class ModuleUserViewModel
  extends BaseCardViewModel<IModuleDTO>
  implements IModuleUserViewModel {}
