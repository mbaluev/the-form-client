import { ParsedUrlQuery } from 'querystring';
import { IUserDTO } from '@model/entities/user';

export interface IUserService {
  getCurrentUser: (token?: string | null) => Promise<IUserDTO | undefined>;
  getUsers: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IUserDTO[] | undefined>;
  getUser: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IUserDTO | undefined>;
  saveUser: (
    data: IUserDTO,
    token?: string | null
  ) => Promise<IUserDTO | undefined>;
  deleteUsers: (
    ids: string[],
    token?: string | null
  ) => Promise<boolean | undefined>;

  getUsersAdmin: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IUserDTO[] | undefined>;
}
