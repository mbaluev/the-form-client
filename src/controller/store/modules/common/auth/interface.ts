import { IBaseCardStore } from '@store/modules/base/card/interfaces';
import { IUserDTO } from '@model/entities/user';

export default interface IAuthStore extends IBaseCardStore<IUserDTO> {
  token?: string | null;
  setToken: (data?: string | null) => void;
  message?: string;

  signup: () => Promise<boolean>;
  signin: () => Promise<boolean>;
  signout: () => Promise<boolean>;
  verify: () => Promise<string | null | undefined>;

  isAuth: boolean;
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  roles?: string[];

  clearMessage: () => Promise<void>;
  clearToken: () => Promise<void>;
}
