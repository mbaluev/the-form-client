import { IUserDTO } from '@model/user';

export interface IAuthService {
  login: (data: IUserDTO) => Promise<void>;
  signup: (data: IUserDTO) => Promise<void>;
}
