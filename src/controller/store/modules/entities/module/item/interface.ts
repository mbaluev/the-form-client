import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { IModuleDTO } from '@model/entities/module';

export default interface IModuleItemStore extends IBaseCardStore<IModuleDTO> {}
