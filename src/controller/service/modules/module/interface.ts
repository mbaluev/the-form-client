import { IModuleDTO, IModuleUserDTO } from '@model/module';
import { ParsedUrlQuery } from 'querystring';

export interface IModuleService {
  getModules: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IModuleDTO[] | undefined>;
  getModule: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IModuleDTO | undefined>;
  saveModule: (
    data: IModuleDTO,
    token?: string | null
  ) => Promise<IModuleDTO | undefined>;
  deleteModules: (
    ids: string[],
    token?: string | null
  ) => Promise<boolean | undefined>;

  // --- user
  getModulesUser: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IModuleUserDTO[] | undefined>;
  getModuleUser: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IModuleUserDTO | undefined>;
}
