import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IModuleService } from '@service/modules/module/interface';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { MODULES } from '@model/module/mock';
import { IModuleDTO } from '@model/module';
import { BLOCKS } from '@model/block/mock';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/block/interface';
import { ParsedUrlQuery } from 'querystring';
import { guid } from '@utils/guid/guid';

@injectable()
export class ModuleService implements IModuleService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  @inject(SERVICE.Block) protected serviceBlock!: IBlockService;

  mockFilterByQuery =
    (query?: ParsedUrlQuery) =>
    (module: IModuleDTO): boolean => {
      return query
        ? query.search
          ? module.title
              .toLowerCase()
              .includes((query.search as string).toLowerCase()) ||
            module.name
              .toLowerCase()
              .includes((query.search as string).toLowerCase())
          : true
        : true;
    };

  getModules = async (
    query?: ParsedUrlQuery
  ): Promise<IModuleDTO[] | undefined> => {
    const modules = [...MODULES];
    for (const item of modules) {
      item.blocks = await this.serviceBlock.getBlocksByModuleId(item.id);
    }
    const result = modules.filter(this.mockFilterByQuery(query));
    return new Promise<IModuleDTO[] | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  getModule = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleDTO | undefined> => {
    const module = MODULES.find((item) => item.id === id);
    if (module) {
      module.blocks = await this.serviceBlock.getBlocksByModuleId(id);
    }
    const display = module && this.mockFilterByQuery(query)(module);
    const result = display ? module : undefined;
    return new Promise<IModuleDTO | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  getModuleByBlockId = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleDTO | undefined> => {
    const block = BLOCKS.find((b) => b.id === id);
    const module = await this.getModule(block?.moduleId);
    const display = module && this.mockFilterByQuery(query)(module);
    const result = display ? module : undefined;
    return new Promise<IModuleDTO | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  saveModule = async (data: IModuleDTO) => {
    if (!data.id) data.id = guid();
    return new Promise<IModuleDTO>((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  deleteModules = async (ids: string[]) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
}
