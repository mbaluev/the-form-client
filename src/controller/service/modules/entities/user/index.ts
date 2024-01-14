import { inject, injectable } from 'inversify';
import { API } from '@api/ids';
import { ParsedUrlQuery } from 'querystring';
import { IUserDTO } from '@model/entities/user';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';
import type IAxiosApi from '@api/modules/axios/interface';
import type IUserService from '@service/modules/entities/user/interface';

@injectable()
export class UserService implements IUserService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `/api/user`;

  getCurrentUser = async (): Promise<IUserDTO | undefined> => {
    return this.axiosApi.get<IUserDTO | undefined>(`${this.API_PREFIX}/me`);
  };

  getUsers = async (query?: ParsedUrlQuery): Promise<IUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IUserDTO>>(
      `${this.API_PREFIX}/list`,
      query
    );
    return ret
      ? ret.data
          ?.concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
          .concat(ret.data)
      : undefined;
  };

  getUser = async (id?: string, query?: ParsedUrlQuery): Promise<IUserDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<IUserDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      query
    );
    return ret ? ret.data : undefined;
  };

  saveUser = async (data: IUserDTO) => {
    if (data.id) {
      const { id, ...query } = data;
      const ret = await this.axiosApi.patch<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        query
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.axiosApi.post<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/create`,
        data
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteUsers = async (ids: string[]) => {
    const ret = await this.axiosApi.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };
}
