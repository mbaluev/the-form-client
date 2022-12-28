import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IUserDTO } from '@model/user';

export interface IAuthViewModel extends IBaseCardViewModel<IUserDTO> {
  token?: string;

  signup: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;

  isAuth: boolean;
}
