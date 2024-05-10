import { inject, injectable } from 'inversify';
import { IModuleUserDTO } from '@model/entities/module';
import { SERVICE } from '@service/ids';
import { BaseCardStore } from '@store/modules/base/card';
import type IModuleBaseStore from '@store/modules/_/module/base/interface';
import type IModuleService from '@service/modules/entities/module/interface';

@injectable()
export class ModuleBaseStore extends BaseCardStore<IModuleUserDTO> implements IModuleBaseStore {
  @inject(SERVICE.Module) protected serviceModule!: IModuleService;
}
