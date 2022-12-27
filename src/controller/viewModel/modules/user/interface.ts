import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IUserDTO } from '@model/user';

export interface IUserViewModel extends IBaseCardViewModel<IUserDTO> {
  userData?: IUserDTO | null;
  setUserData: (data?: IUserDTO | null) => void;
  clearUserData: () => Promise<void>;
}
