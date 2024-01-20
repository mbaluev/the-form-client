import { inject, injectable } from 'inversify';
import { action, makeObservable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import { MaterialBaseStore } from '@store/modules/entities/material/base';
import { STORE } from '@store/ids';
import type IMaterialUserStore from '@store/modules/entities/material/user/interface';
import type IBlockUserStore from '@store/modules/entities/block/_/user/interface';

@injectable()
export class MaterialUserStore extends MaterialBaseStore implements IMaterialUserStore {
  @inject(STORE.BlockUser) protected blockUserStore!: IBlockUserStore;

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
      if (this.blockUserStore.data) {
        const data = await this.serviceMaterial.getMaterialsUser({
          userBlockId: this.blockUserStore.data.id,
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
        if (this.blockUserStore.data) {
          await this.blockUserStore.getData(this.blockUserStore.data.id);
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
