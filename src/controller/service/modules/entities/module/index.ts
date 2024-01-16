import { inject, injectable } from 'inversify';
import { IModuleDTO, IModuleUserDTO } from '@model/entities/module';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';
import { API } from '@api/ids';
import type IModuleService from '@service/modules/entities/module/interface';
import type IAxiosApi from '@api/modules/axios/interface';

@injectable()
export class ModuleService implements IModuleService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `/api/module`;

  getModules = async (query?: ParsedUrlQuery): Promise<IModuleDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IModuleDTO>>(`${this.API_PREFIX}/list`, {
      ...query,
    });
    return ret ? ret.data : undefined;
  };

  getModule = async (id?: string, query?: ParsedUrlQuery): Promise<IModuleDTO | undefined> => {
    const ret = await this.axiosApi.post<IResponseItemDTO<IModuleDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveModule = async (data: IModuleDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.axiosApi.patch<IResponseItemDTO<IModuleDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.axiosApi.post<IResponseItemDTO<IModuleDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteModules = async (ids: string[]) => {
    const ret = await this.axiosApi.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getModulesUser = async (query?: ParsedUrlQuery): Promise<IModuleUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getModuleUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.axiosApi.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getModuleUserByBlockId = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.axiosApi.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/user/blockId/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  // --- admin

  getModulesAdmin = async (query?: ParsedUrlQuery): Promise<IModuleUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getModuleAdmin = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IModuleUserDTO | undefined> => {
    const ret = await this.axiosApi.post<IResponseItemDTO<IModuleUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };
}
