import { IModuleUserDTO } from '@model/entities/module';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IModuleBaseStore extends IBaseCardStore<IModuleUserDTO> {}
