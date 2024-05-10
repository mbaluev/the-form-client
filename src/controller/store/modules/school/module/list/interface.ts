import type IBaseListStore from '@store/modules/base/list/interface';
import { IModuleUserDTO } from '@model/entities/module';

export default interface IModuleSchoolListStore extends IBaseListStore<IModuleUserDTO> {}
