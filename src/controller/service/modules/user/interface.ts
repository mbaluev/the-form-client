import { ParsedUrlQuery } from 'querystring';
import { IUserDTO } from '@model/user';

export interface IUserService {
  getUsers: (query?: ParsedUrlQuery) => Promise<IUserDTO[] | undefined>;
  getUser: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IUserDTO | undefined>;
  saveUser: (data: IUserDTO) => Promise<IUserDTO | undefined>;
  deleteUsers: (ids: string[]) => Promise<boolean>;
}
