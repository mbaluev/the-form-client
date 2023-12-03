import { ParsedUrlQuery } from 'querystring';
import { IUserDTO } from '@model/entities/user';

export interface IUserService {
  getCurrentUser: () => Promise<IUserDTO | undefined>;
  getUsers: (query?: ParsedUrlQuery) => Promise<IUserDTO[] | undefined>;
  getUser: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IUserDTO | undefined>;
  saveUser: (data: IUserDTO) => Promise<IUserDTO | undefined>;
  deleteUsers: (ids: string[]) => Promise<boolean | undefined>;

  getUsersAdmin: (query?: ParsedUrlQuery) => Promise<IUserDTO[] | undefined>;
}
