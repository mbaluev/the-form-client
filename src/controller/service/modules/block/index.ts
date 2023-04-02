import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IBlockService } from '@service/modules/block/interface';
import { IBlockDTO, IBlockUserDTO } from '@model/block';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/response';

@injectable()
export class BlockService implements IBlockService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/block`;

  getBlocks = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IBlockUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IBlockUserDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getBlock = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IBlockUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IBlockUserDTO>>(
      `${this.API_PREFIX}/get/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveBlock = async (data: IBlockDTO, token?: string | null) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IBlockUserDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IBlockUserDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteBlocks = async (ids: string[], token?: string | null) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.success : undefined;
  };

  getBlockUser = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IBlockUserDTO | undefined> => {
    const ret = await this.apiModule.post<IResponseItemDTO<IBlockUserDTO>>(
      `${this.API_PREFIX}/get/user/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };
}
