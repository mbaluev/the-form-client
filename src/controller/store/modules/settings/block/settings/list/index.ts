import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IBlockDTO } from '@model/entities/block';
import type IBlockService from '@service/modules/entities/block/interface';
import type IBlockSettingsListStore from '@store/modules/settings/block/settings/list/interface';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class BlockSettingsListStore
  extends BaseListStore<IBlockDTO>
  implements IBlockSettingsListStore
{
  @inject(SERVICE.Block) private blockService!: IBlockService;

  getData = async (query?: ParsedUrlQuery) => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.blockService.getBlocks(query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data
      ?.filter((d) => {
        return (
          d.title?.toLowerCase()?.includes(searchText || '') ||
          d.name?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.sort((a, b) => (a.position > b.position ? 1 : 0));
  }

  filterName = 'query_block';
}
