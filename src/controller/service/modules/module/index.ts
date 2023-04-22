import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IModuleService } from '@service/modules/module/interface';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IModuleDTO, IModuleUserDTO } from '@model/module';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/response';

@injectable()
export class ModuleService implements IModuleService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/module`;

  getModules = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IModuleDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IModuleDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getModule = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IModuleDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IModuleDTO>>(
      `${this.API_PREFIX}/get/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveModule = async (data: IModuleDTO, token?: string | null) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IModuleDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IModuleDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteModules = async (ids: string[], token?: string | null) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getModulesUser = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IModuleUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getModuleUser = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/get/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };
}
