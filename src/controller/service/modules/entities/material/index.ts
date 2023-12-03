import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';
import { IMaterialDTO, IMaterialUserDTO } from '@model/entities/material';
import { IMaterialService } from '@service/modules/entities/material/interface';

@injectable()
export class MaterialService implements IMaterialService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/material`;

  getMaterials = async (
    query?: ParsedUrlQuery
  ): Promise<IMaterialDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IMaterialDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getMaterial = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IMaterialDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IMaterialDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveMaterial = async (data: IMaterialDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IMaterialDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IMaterialDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteMaterials = async (ids: string[]) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getMaterialsUser = async (
    query?: ParsedUrlQuery
  ): Promise<IMaterialUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IMaterialUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getMaterialUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IMaterialUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IMaterialUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  updateMaterialUser = async (id: string) => {
    const ret = await this.apiModule.post<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/user/update/${id}`
    );
    return ret ? ret.success : undefined;
  };
}
