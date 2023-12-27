import type IBaseListStore from '@store/modules/base/list/interface';
import { IUserDTO } from '@model/entities/user';

type IUserListStore = IBaseListStore<IUserDTO>;
export default IUserListStore;
