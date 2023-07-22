import { injectable } from 'inversify';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { BlockBaseViewModel } from '@viewModel/modules/entities/block/base';

@injectable()
export class BlockUserViewModel
  extends BlockBaseViewModel
  implements IBlockUserViewModel
{
  getData = async (id: string) => {
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceBlock.getBlockUser(id, undefined, token);
      this.setData(data);
    } catch (err) {
    } finally {
    }
  };
}
