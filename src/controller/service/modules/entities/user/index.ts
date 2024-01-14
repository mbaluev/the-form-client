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

  getCurrentUser = async (): Promise<IUserDTO | undefined> => {
    return this.apiModule.get<IUserDTO | undefined>(`${this.API_PREFIX}/me`);
  };

  getUsers = async (query?: ParsedUrlQuery): Promise<IUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IUserDTO>>(`${this.API_PREFIX}/list`, {
      ...query,
    });
    return ret ? ret.data : undefined;
  };

  getUser = async (id?: string, query?: ParsedUrlQuery): Promise<IUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IUserDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveUser = async (data: IUserDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteUsers = async (ids: string[]) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // admin

  getUsersAdmin = async (query?: ParsedUrlQuery): Promise<IUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };
}
