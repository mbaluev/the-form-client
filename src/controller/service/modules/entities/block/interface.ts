import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';
import { ParsedUrlQuery } from 'querystring';

export interface IBlockService {
  getBlocks: (query?: ParsedUrlQuery) => Promise<IBlockDTO[] | undefined>;
  getBlock: (id?: string, query?: ParsedUrlQuery) => Promise<IBlockDTO | undefined>;
  saveBlock: (data: IBlockDTO) => Promise<IBlockDTO | undefined>;
  deleteBlocks: (ids: string[]) => Promise<boolean | undefined>;

  // --- user
  getBlockUser: (id?: string, query?: ParsedUrlQuery) => Promise<IBlockUserDTO | undefined>;

  // --- admin
  getBlocksAdmin: (query?: ParsedUrlQuery) => Promise<IBlockUserDTO[] | undefined>;
  getBlockAdmin: (id?: string, query?: ParsedUrlQuery) => Promise<IBlockUserDTO | undefined>;
}
