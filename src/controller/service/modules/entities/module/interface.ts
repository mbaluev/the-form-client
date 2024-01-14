import { IModuleDTO, IModuleUserDTO } from '@model/entities/module';
import { ParsedUrlQuery } from 'querystring';

export interface IModuleService {
  getModules: (query?: ParsedUrlQuery) => Promise<IModuleDTO[] | undefined>;
  getModule: (id?: string, query?: ParsedUrlQuery) => Promise<IModuleDTO | undefined>;
  saveModule: (data: IModuleDTO) => Promise<IModuleDTO | undefined>;
  deleteModules: (ids: string[]) => Promise<boolean | undefined>;

  // --- user
  getModulesUser: (query?: ParsedUrlQuery) => Promise<IModuleUserDTO[] | undefined>;
  getModuleUser: (id?: string, query?: ParsedUrlQuery) => Promise<IModuleUserDTO | undefined>;
  getModuleUserByBlockId: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IModuleUserDTO | undefined>;

  // --- admin
  getModulesAdmin: (query?: ParsedUrlQuery) => Promise<IModuleUserDTO[] | undefined>;
  getModuleAdmin: (id?: string, query?: ParsedUrlQuery) => Promise<IModuleUserDTO | undefined>;
}
