import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IModuleService } from '@service/modules/entities/module/interface';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IModuleDTO, IModuleUserDTO } from '@model/entities/module';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';

@injectable()
export class ModuleService implements IModuleService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/module`;

  getModules = async (query?: ParsedUrlQuery): Promise<IModuleDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IModuleDTO>>(`${this.API_PREFIX}/list`, {
      ...query,
    });
    return ret ? ret.data : undefined;
  };

  getModule = async (id?: string, query?: ParsedUrlQuery): Promise<IModuleDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IModuleDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveModule = async (data: IModuleDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IModuleDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IModuleDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteModules = async (ids: string[]) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getModulesUser = async (query?: ParsedUrlQuery): Promise<IModuleUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getModuleUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getModuleUserByBlockId = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/blockId/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  // --- admin

  getModulesAdmin = async (query?: ParsedUrlQuery): Promise<IModuleUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getModuleAdmin = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };
}
