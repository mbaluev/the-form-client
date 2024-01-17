import { IUserDTO } from '@model/entities/user';
import type IBaseListStore from '@store/modules/base/list/interface';

export default interface IUserListStore extends IBaseListStore<IUserDTO> {}
