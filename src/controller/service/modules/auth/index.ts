import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IUserDTO } from '@model/user';
import { IAuthService } from '@service/modules/auth/interface';

@injectable()
export class AuthService implements IAuthService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `${process.env.REACT_APP_CORE_URL}/api/auth`;

  login = async (data: IUserDTO) => {
    const ret = await this.apiModule.post(`${this.API_PREFIX}/login`, {
      username: data.username,
      password: data.password,
    });
    console.log(ret);
  };

  signup = async (data: IUserDTO) => {
    await this.apiModule.post(`${this.API_PREFIX}/signup`, {
      username: data.username,
      password: data.password,
    });
  };
}
