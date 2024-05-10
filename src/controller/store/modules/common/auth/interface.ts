import { IAccountDTO } from '@model/common/auth';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IAuthStore extends IBaseCardStore<IAccountDTO> {
  token?: string | null;
  setToken: (data?: string | null) => void;
  message?: string;

  init: () => void;
  signUp: () => Promise<boolean>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
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
