import { inject, injectable } from 'inversify';
import { IUserDTO } from '@model/entities/user';
import { IAuthResponse } from 'controller/model/common/auth';
import { API } from '@api/ids';
import type IAxiosApi from '@api/modules/axios/interface';
import type IAuthService from '@service/modules/common/auth/interface';

@injectable()
export class AuthService implements IAuthService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `${process.env.REACT_APP_CORE_URL}/api/auth`;

  signup = async (data: IUserDTO) => {
    return this.axiosApi.post<IAuthResponse>(`${this.API_PREFIX}/signup`, data);
  };

  signin = async (data: IUserDTO) => {
    return this.axiosApi.post<IAuthResponse>(`${this.API_PREFIX}/signin`, data);
  };

  signout = async () => {
    return this.axiosApi.get<IAuthResponse>(`${this.API_PREFIX}/signout`);
  };
}
