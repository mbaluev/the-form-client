import { IBaseCardStore } from '@store/modules/base/card/interfaces';
import { IAccountDTO } from '@model/common/auth';

export default interface IAuthStore extends IBaseCardStore<IAccountDTO> {
  token?: string | null;
  setToken: (data?: string | null) => void;
  message?: string;

  init: () => void;
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
