import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IUserDTO } from '@model/user';
import { IAuthService } from '@service/modules/auth/interface';
import { IAuthResponse } from '@model/auth';

@injectable()
export class AuthService implements IAuthService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `${process.env.REACT_APP_CORE_URL}/api/auth`;

  signup = async (data: IUserDTO) => {
    return this.apiModule.post<IAuthResponse>(`${this.API_PREFIX}/signup`, {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
    });
  };

  signin = async (data: IUserDTO) => {
    return this.apiModule.post<IAuthResponse>(`${this.API_PREFIX}/signin`, {
      username: data.username,
      password: data.password,
    });
  };

  signout = async (token?: string) => {
    return this.apiModule.get<IAuthResponse>(
      `${this.API_PREFIX}/signout`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  getToken = async (refreshToken?: string) => {
    return this.apiModule.post<IAuthResponse>(
      `${this.API_PREFIX}/token`,
      null,
      { headers: { Cookie: `refreshToken=${refreshToken};` } }
    );
  };

  refreshToken = async () => {
    return this.apiModule.post<IAuthResponse>(
      `${this.API_PREFIX}/refreshToken`
    );
  };
}
