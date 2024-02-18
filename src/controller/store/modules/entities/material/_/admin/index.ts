import { inject, injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { MaterialBaseStore } from '@store/modules/entities/material/_/base';
import IMaterialAdminStore from '@store/modules/entities/material/_/admin/interface';
import { STORE } from '@store/ids';
import type IBlockAdminStore from '@store/modules/entities/block/_/admin/interface';

@injectable()
export class MaterialAdminStore extends MaterialBaseStore implements IMaterialAdminStore {
  @inject(STORE.BlockAdmin) protected blockAdminStore!: IBlockAdminStore;

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.blockAdminStore.data) {
        const data = await this.serviceMaterial.getMaterialsUser({
          userBlockId: this.blockAdminStore.data.id,
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
}
