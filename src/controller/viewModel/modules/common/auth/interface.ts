import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IUserDTO } from '@model/entities/user';

export interface IAuthViewModel extends IBaseCardViewModel<IUserDTO> {
  token?: string | null;
  setToken: (data?: string | null) => void;
  message?: string;

  signup: () => Promise<boolean>;
  signin: () => Promise<boolean>;
  signout: () => Promise<boolean>;
  refreshToken: () => Promise<string | undefined>;

  isAuth: boolean;
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  roles?: string[];

  clearMessage: () => Promise<void>;
  clearToken: () => Promise<void>;
}
