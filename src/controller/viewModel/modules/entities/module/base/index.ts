import { inject, injectable } from 'inversify';
import { IModuleUserDTO } from '@model/entities/module';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IModuleBaseViewModel } from '@viewModel/modules/entities/module/base/interface';
import { SERVICE } from '@service/ids';
import { ModuleService } from '@service/modules/entities/module';

@injectable()
export class ModuleBaseViewModel
  extends BaseCardViewModel<IModuleUserDTO>
  implements IModuleBaseViewModel
{
  @inject(SERVICE.Module) protected serviceModule!: ModuleService;
}
