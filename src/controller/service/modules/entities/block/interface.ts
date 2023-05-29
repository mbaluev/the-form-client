import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';
import { ParsedUrlQuery } from 'querystring';

export interface IBlockService {
  getBlocks: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IBlockDTO[] | undefined>;
  getBlock: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IBlockDTO | undefined>;
  saveBlock: (
    data: IBlockDTO,
    token?: string | null
  ) => Promise<IBlockDTO | undefined>;
  deleteBlocks: (
    ids: string[],
    token?: string | null
  ) => Promise<boolean | undefined>;

  // --- user
  getBlockUser: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IBlockUserDTO | undefined>;
}
