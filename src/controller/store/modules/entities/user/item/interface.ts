import { IUserDTO } from '@model/entities/user';
import { IBaseCardStore } from '@store/modules/base/card/interfaces';

interface IUserItemStore extends IBaseCardStore<IUserDTO> {
  userData?: IUserDTO | null;
  setUserData: (data?: IUserDTO | null) => void;
  clearUserData: () => Promise<void>;
}

export default IUserItemStore;
