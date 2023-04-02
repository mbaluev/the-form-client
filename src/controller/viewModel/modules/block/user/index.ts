import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/block';
import { BlockService } from '@service/modules/block';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';
import { FilterViewModel } from '@viewModel/modules/filter';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';

@injectable()
export class BlockUserViewModel
  extends BaseCardViewModel<IBlockUserDTO>
  implements IBlockUserViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Filter) protected filters!: FilterViewModel;

  // --- override

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
