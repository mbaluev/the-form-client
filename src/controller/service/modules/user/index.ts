import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { ParsedUrlQuery } from 'querystring';
import { guid } from '@utils/guid/guid';
import { IUserService } from '@service/modules/user/interface';
import { IUserDTO } from '@model/user';
import { MOCK_USERS } from '@model/user/mock';

@injectable()
export class UserService implements IUserService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  mockFilterByQuery =
    (query?: ParsedUrlQuery) =>
    (user: IUserDTO): boolean => {
      return query
        ? query.search
          ? user.name
              .toLowerCase()
              .includes((query.search as string).toLowerCase()) ||
            user.email
              .toLowerCase()
              .includes((query.search as string).toLowerCase())
          : true
        : true;
    };

  getUsers = async (
    query?: ParsedUrlQuery
  ): Promise<IUserDTO[] | undefined> => {
    const users = [...MOCK_USERS];
    const result = users.filter(this.mockFilterByQuery(query));
    return new Promise<IUserDTO[] | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  getUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IUserDTO | undefined> => {
    const users = [...MOCK_USERS];
    const user = users.find((item) => item.id === id);
    const display = user && this.mockFilterByQuery(query)(user);
    const result = display ? user : undefined;
    return new Promise<IUserDTO | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  saveUser = async (data: IUserDTO) => {
    if (!data.id) data.id = guid();
    return new Promise<IUserDTO>((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  deleteUsers = async (ids: string[]) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
}
