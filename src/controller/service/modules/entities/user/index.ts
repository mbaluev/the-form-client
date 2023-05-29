import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { ParsedUrlQuery } from 'querystring';
import { IUserService } from '@service/modules/entities/user/interface';
import { IUserDTO } from '@model/entities/user';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';

@injectable()
export class UserService implements IUserService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/user`;

  getCurrentUser = async (
    token?: string | null
  ): Promise<IUserDTO | undefined> => {
    return this.apiModule.get<IUserDTO | undefined>(
      `${this.API_PREFIX}/me`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  getUsers = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IUserDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getUser = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IUserDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveUser = async (data: IUserDTO, token?: string | null) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteUsers = async (ids: string[], token?: string | null) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.success : undefined;
  };
}
