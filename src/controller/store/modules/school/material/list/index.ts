import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IMaterialUserDTO } from '@model/entities/material';
import type IMaterialSchoolListStore from '@store/modules/school/material/list/interface';
import type IMaterialService from '@service/modules/entities/material/interface';
import type IBlockSchoolItemStore from '@store/modules/school/block/item/interface';
import { action, makeObservable } from 'mobx';

@injectable()
export class MaterialSchoolListStore
  extends BaseListStore<IMaterialUserDTO>
  implements IMaterialSchoolListStore
{
  @inject(SERVICE.Material) private materialService!: IMaterialService;

  @inject(STORE.BlockSchoolItem) protected blockUserStore!: IBlockSchoolItemStore;

  constructor() {
    super();
    makeObservable(this, {
      update: action,
    });
  }

  getData = async () => {
    this.setData();
    this.setLoading(true);
    try {
      if (this.blockUserStore.data) {
        const data = await this.materialService.getMaterialsUser({
          userBlockId: this.blockUserStore.data.id,
        });
        this.setData(data);
      }
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  update = async (id: string, complete: boolean) => {
    if (!complete) {
      this.setItemLoading(id, true);
      try {
        await this.materialService.updateMaterialUser(id);
        if (this.blockUserStore.data) {
          await this.blockUserStore.getData(this.blockUserStore.data.id);
        }
        return true;
      } catch (err) {
      } finally {
        this.setItemLoading(id, false);
      }
    }
    return false;
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data
      ?.filter((d) => {
        return (
          d.material?.document?.id?.toLowerCase()?.includes(searchText || '') ||
          d.material?.document?.name?.toLowerCase()?.includes(searchText || '') ||
          d.material?.document?.url?.toLowerCase()?.includes(searchText || '') ||
          d.material?.document?.file?.name?.toLowerCase()?.includes(searchText || '') ||
          d.material?.document?.file?.id?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.sort((a, b) =>
        a.material?.document &&
        b.material?.document &&
        a.material?.document.name > b.material?.document.name
          ? 1
          : 0
      );
  }

  filterName = 'query_material_school';
}
