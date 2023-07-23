import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { action, makeObservable } from 'mobx';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import { MaterialBaseViewModel } from '@viewModel/modules/entities/material/base';

@injectable()
export class MaterialUserViewModel
  extends MaterialBaseViewModel
  implements IMaterialUserViewModel
{
  @inject(VIEW_MODEL.BlockUser) protected userBlock!: BlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      update: action,
    });
  }

  // --- override

  getList = async () => {
    await this.clearList();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceMaterial.getMaterialsUser(
          { userBlockId: this.userBlock.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id: string) => {
    this.setDataLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceMaterial.getMaterialUser(
        id,
        undefined,
        token
      );
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  update = async (id: string, complete: boolean) => {
    if (!complete) {
      this.setDataLoading(true);
      try {
        const token = await this.auth.refreshToken();
        await this.serviceMaterial.updateMaterialUser(id, token);
        if (this.userBlock.data) {
          await this.userBlock.getData(this.userBlock.data.id);
          this.userBlock.changeTab(BlockTabNames.materials);
        }
        return true;
      } catch (err) {
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };
}
