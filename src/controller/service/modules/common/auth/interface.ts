import { IUserDTO } from '@model/entities/user';
import { IAuthResponse } from 'controller/model/common/auth';

export interface IAuthService {
  signup: (data: IUserDTO) => Promise<IAuthResponse>;
  signin: (data: IUserDTO) => Promise<IAuthResponse>;
  signout: (token?: string) => Promise<IAuthResponse>;
  getToken: (refreshToken?: string) => Promise<IAuthResponse>;
  refreshToken: () => Promise<IAuthResponse>;
}
