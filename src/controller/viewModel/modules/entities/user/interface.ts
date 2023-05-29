import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IUserDTO } from '@model/entities/user';

export interface IUserViewModel extends IBaseCardViewModel<IUserDTO> {
  userData?: IUserDTO | null;
  setUserData: (data?: IUserDTO | null) => void;
  clearUserData: () => Promise<void>;
}
