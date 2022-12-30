import { ParsedUrlQuery } from 'querystring';
import { IUserDTO } from '@model/user';

export interface IUserService {
  getCurrentUser: (token?: string) => Promise<IUserDTO | undefined>;
  getUsers: (
    query?: ParsedUrlQuery,
    token?: string
  ) => Promise<IUserDTO[] | undefined>;
  getUser: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string
  ) => Promise<IUserDTO | undefined>;
  saveUser: (data: IUserDTO, token?: string) => Promise<IUserDTO | undefined>;
  deleteUsers: (ids: string[], token?: string) => Promise<boolean | undefined>;
}
