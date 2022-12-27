import { IModuleDTO } from '@model/module';
import { ParsedUrlQuery } from 'querystring';

export interface IModuleService {
  getModules: (query?: ParsedUrlQuery) => Promise<IModuleDTO[] | undefined>;
  getModule: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IModuleDTO | undefined>;
  getModuleByBlockId: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IModuleDTO | undefined>;
  saveModule: (data: IModuleDTO) => Promise<IModuleDTO>;
  deleteModules: (ids: string[]) => Promise<boolean>;
}
