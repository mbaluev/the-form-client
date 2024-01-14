import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IBlockService } from '@service/modules/entities/block/interface';
import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';

@injectable()
export class BlockService implements IBlockService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/block`;

  getBlocks = async (query?: ParsedUrlQuery): Promise<IBlockDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IBlockDTO>>(`${this.API_PREFIX}/list`, {
      ...query,
    });
    return ret ? ret.data : undefined;
  };

  getBlock = async (id?: string, query?: ParsedUrlQuery): Promise<IBlockDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IBlockDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveBlock = async (data: IBlockDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IBlockDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IBlockDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteBlocks = async (ids: string[]) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getBlockUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IBlockUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IBlockUserDTO>>(
      `${this.API_PREFIX}/user/item/${id ? id : ''}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  // --- admin

  getBlocksAdmin = async (query?: ParsedUrlQuery): Promise<IBlockUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IBlockUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getBlockAdmin = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IBlockUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IBlockUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };
}
