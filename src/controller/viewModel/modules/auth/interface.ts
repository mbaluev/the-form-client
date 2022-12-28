import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IUserDTO } from '@model/user';

export interface IAuthViewModel extends IBaseCardViewModel<IUserDTO> {
  token?: string;
  login: () => Promise<void>;
  signup: () => Promise<void>;
}
