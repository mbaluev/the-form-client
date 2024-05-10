import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IMaterialDTO } from '@model/entities/material';
import type IMaterialSettingsItemStore from '@store/modules/settings/material/item/interface';
import type IMaterialService from '@service/modules/entities/material/interface';
import type IMaterialSettingsListStore from '@store/modules/settings/material/list/interface';

@injectable()
export class MaterialSettingsItemStore
  extends BaseCardStore<IMaterialDTO>
  implements IMaterialSettingsItemStore
{
  @inject(SERVICE.Material) private materialService!: IMaterialService;

  @inject(STORE.MaterialSettingsList) private materialListStore!: IMaterialSettingsListStore;

  // --- override

  getModalData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setModalData();
    this.setModalLoading(true);
    try {
      const data = await this.materialService.getMaterial(id, query);
      this.setModalData(data);
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async (data?: IMaterialDTO) => {
    if (data) {
      this.setSaveLoading(true);
      try {
        const res = await this.materialService.saveMaterial(data);
        await this.materialListStore.getData({ blockId: data.blockId });
        return res;
      } catch (err) {
      } finally {
        this.setSaveLoading(false);
      }
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    if (this.deleteIds) {
      this.setDeleteLoading(true);
      try {
        await this.materialService.deleteMaterials(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      } catch (err) {
        return false;
      } finally {
        this.setDeleteLoading(false);
      }
    }
  };
}
