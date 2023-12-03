import { injectable } from 'inversify';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { BlockBaseViewModel } from '@viewModel/modules/entities/block/base';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class BlockUserViewModel
  extends BlockBaseViewModel
  implements IBlockUserViewModel
{
  getData = async (id?: string, query?: ParsedUrlQuery) => {
    try {
      const data = await this.serviceBlock.getBlockUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
    }
  };
}
