import { IUserDTO } from '@model/entities/user';
import type IBaseListStore from '@store/modules/base/list/interface';

export default interface IUserSettingsListStore extends IBaseListStore<IUserDTO> {}
