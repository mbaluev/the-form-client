import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/entities/block';
import { BlockService } from 'controller/service/modules/entities/block';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { FilterViewModel } from '@viewModel/modules/common/filter';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { action, makeObservable, observable } from 'mobx';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';

@injectable()
export class BlockUserViewModel
  extends BaseCardViewModel<IBlockUserDTO>
  implements IBlockUserViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Filter) protected filters!: FilterViewModel;

  constructor() {
    super();
    makeObservable(this, {
      tab: observable,
      setTab: action,
      changeTab: action,
    });
  }

  tab = BlockTabNames.materials;

  setTab = (value: BlockTabNames) => (this.tab = value);

  changeTab = (value: BlockTabNames) => {
    this.setTab(value);
  };

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
