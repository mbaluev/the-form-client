import { IUserDTO } from '@model/entities/user';
import { IBaseCardStore } from '@store/modules/base/card/interfaces';

type IUserItemStore = IBaseCardStore<IUserDTO>;

export default IUserItemStore;
