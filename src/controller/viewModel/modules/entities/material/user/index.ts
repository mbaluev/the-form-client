import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { action, makeObservable } from 'mobx';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { MaterialBaseViewModel } from '@viewModel/modules/entities/material/base';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class MaterialUserViewModel extends MaterialBaseViewModel implements IMaterialUserViewModel {
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
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const data = await this.serviceMaterial.getMaterialsUser({
          userBlockId: this.userBlock.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceMaterial.getMaterialUser(id, query);
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
        await this.serviceMaterial.updateMaterialUser(id);
        if (this.userBlock.data) {
          await this.userBlock.getData(this.userBlock.data.id);
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
