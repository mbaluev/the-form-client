import { IUserDTO } from '@model/user';
import { IAuthResponse } from '@model/auth';

export interface IAuthService {
  signup: (data: IUserDTO) => Promise<IAuthResponse>;
  login: (data: IUserDTO) => Promise<IAuthResponse>;
  logout: (token?: string) => Promise<IAuthResponse>;
  refreshToken: () => Promise<IAuthResponse>;
}
