import type IBaseListStore from '@store/modules/base/list/interface';
import { IModuleDTO } from '@model/entities/module';

export default interface IModuleSettingsListStore extends IBaseListStore<IModuleDTO> {}
