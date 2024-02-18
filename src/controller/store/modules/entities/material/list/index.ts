import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IMaterialDTO } from '@model/entities/material';
import { ParsedUrlQuery } from 'querystring';
import type IMaterialListStore from '@store/modules/entities/material/list/interface';
import type IMaterialService from '@service/modules/entities/material/interface';

@injectable()
export class MaterialListStore extends BaseListStore<IMaterialDTO> implements IMaterialListStore {
  @inject(SERVICE.Material) private materialService!: IMaterialService;

  getData = async (query?: ParsedUrlQuery) => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.materialService.getMaterials(query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters.query?.toLowerCase();
    return this.data?.filter((d) => {
      return (
        d.document?.name?.toLowerCase()?.includes(searchText || '') ||
        d.block?.name?.toLowerCase()?.includes(searchText || '') ||
        d.block?.title?.toLowerCase()?.includes(searchText || '')
      );
    });
  }

  filterName = 'query';
}
