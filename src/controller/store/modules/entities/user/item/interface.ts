import { IUserDTO } from '@model/entities/user';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IUserItemStore extends IBaseCardStore<IUserDTO> {}
