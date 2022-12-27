import { IBlockDTO } from '@model/block';
import { ParsedUrlQuery } from 'querystring';

export interface IBlockService {
  getBlocks: (query?: ParsedUrlQuery) => Promise<IBlockDTO[] | undefined>;
  getBlocksByModuleId: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IBlockDTO[] | undefined>;
  getBlock: (
    id?: string,
    query?: ParsedUrlQuery
  ) => Promise<IBlockDTO | undefined>;
  saveBlock: (data: IBlockDTO) => Promise<IBlockDTO>;
  deleteBlocks: (ids: string[]) => Promise<boolean>;
}
