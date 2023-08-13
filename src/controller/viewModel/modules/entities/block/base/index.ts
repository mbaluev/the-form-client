import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/entities/block';
import { BlockService } from 'controller/service/modules/entities/block';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { action, makeObservable, observable } from 'mobx';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import { IBlockBaseViewModel } from '@viewModel/modules/entities/block/base/interface';

@injectable()
export class BlockBaseViewModel
  extends BaseCardViewModel<IBlockUserDTO>
  implements IBlockBaseViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  constructor() {
    super();
    makeObservable(this, {
      tab: observable,
      setTab: action,
      changeTab: action,
      refresh: action,
    });
  }

  tab = BlockTabNames.materials;

  setTab = (value: BlockTabNames) => (this.tab = value);

  changeTab = (value: BlockTabNames) => {
    this.setTab(value);
  };

  refresh = async () => {
    if (this.data?.id) await this.getData(this.data.id);
  };
}
