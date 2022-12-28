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
      username: data.username,
      password: data.password,
    });
  };

  login = async (data: IUserDTO) => {
    return this.apiModule.post<IAuthResponse>(`${this.API_PREFIX}/login`, {
      username: data.username,
      password: data.password,
    });
  };

  logout = async (token?: string) => {
    return this.apiModule.post<IAuthResponse>(
      `${this.API_PREFIX}/logout`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  refreshToken = async () => {
    return this.apiModule.post<IAuthResponse>(
      `${this.API_PREFIX}/refreshToken`
    );
  };
}
