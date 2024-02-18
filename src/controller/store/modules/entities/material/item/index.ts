import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IMaterialDTO } from '@model/entities/material';
import type IMaterialItemStore from '@store/modules/entities/material/item/interface';
import type IMaterialService from '@service/modules/entities/material/interface';

@injectable()
export class MaterialItemStore extends BaseCardStore<IMaterialDTO> implements IMaterialItemStore {
  @inject(SERVICE.Material) private materialService!: IMaterialService;

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.materialService.getMaterials(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

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
    this.setModalLoading(true);
    try {
      if (data) {
        const res = await this.materialService.saveMaterial(data);
        this.setModalData(res);
        return res;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.materialService.deleteMaterials(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
