import { IUserDTO } from '@model/entities/user';
import { IAuthResponse } from 'controller/model/common/auth';

export default interface IAuthService {
  signup: (data: IUserDTO) => Promise<IAuthResponse>;
  signin: (data: IUserDTO) => Promise<IAuthResponse>;
  signout: () => Promise<IAuthResponse>;
}
