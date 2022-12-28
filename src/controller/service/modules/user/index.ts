import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { ParsedUrlQuery } from 'querystring';
import { guid } from '@utils/guid/guid';
import { IUserService } from '@service/modules/user/interface';
import { IUserDTO } from '@model/user';
import { IResponseItemDTO, IResponseListDTO } from '@model/response';
import { MOCK_USERS } from '@model/user/mock';

@injectable()
export class UserService implements IUserService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `${process.env.REACT_APP_CORE_URL}/api/user`;

  MOCK = false;

  mockFilterByQuery =
    (query?: ParsedUrlQuery) =>
    (user: IUserDTO): boolean => {
      return query
        ? query.search
          ? user.username
              .toLowerCase()
              .includes((query.search as string).toLowerCase())
          : true
        : true;
    };

  getUsers = async (
    query?: ParsedUrlQuery
  ): Promise<IUserDTO[] | undefined> => {
    if (this.MOCK) {
      const users = [...MOCK_USERS];
      const result = users.filter(this.mockFilterByQuery(query));
      return new Promise<IUserDTO[] | undefined>((resolve) => {
        setTimeout(() => resolve(result), 0);
      });
    } else {
      const ret = await this.apiModule.get<IResponseListDTO<IUserDTO>>(
        `${this.API_PREFIX}/list`,
        { ...query }
      );
      return ret.data;
    }
  };

  getUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IUserDTO | undefined> => {
    if (this.MOCK) {
      const users = [...MOCK_USERS];
      const user = users.find((item) => item.id === id);
      const display = user && this.mockFilterByQuery(query)(user);
      const result = display ? user : undefined;
      return new Promise<IUserDTO | undefined>((resolve) => {
        setTimeout(() => resolve(result), 0);
      });
    } else {
      const ret = await this.apiModule.get<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/get/${id}`,
        { ...query }
      );
      return ret.data;
    }
  };

  saveUser = async (data: IUserDTO) => {
    if (this.MOCK) {
      if (!data.id) data.id = guid();
      return new Promise<IUserDTO>((resolve) => {
        setTimeout(() => resolve(data), 1000);
      });
    } else {
      if (data.id) {
        const { id, ...params } = data;
        const ret = await this.apiModule.patch<IResponseItemDTO<IUserDTO>>(
          `${this.API_PREFIX}/update/${data.id}`,
          { ...params }
        );
        return ret.data;
      } else {
        const ret = await this.apiModule.post<IResponseItemDTO<IUserDTO>>(
          `${this.API_PREFIX}/create`,
          { ...data }
        );
        return ret.data;
      }
    }
  };

  deleteUsers = async (ids: string[]) => {
    if (this.MOCK) {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
    } else {
      const ret = await this.apiModule.delete<IResponseItemDTO<IUserDTO>>(
        `${this.API_PREFIX}/delete`,
        { ids }
      );
      return ret.success;
    }
  };
}
