import { injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { BlockBaseStore } from '@store/modules/entities/block/_/base';
import type IBlockUserStore from '@store/modules/entities/block/_/user/interface';

@injectable()
export class BlockUserStore extends BlockBaseStore implements IBlockUserStore {
  getData = async (id?: string, query?: ParsedUrlQuery) => {
    try {
      const data = await this.serviceBlock.getBlockUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
    }
  };
}
