import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { ParsedUrlQuery } from 'querystring';
import { ITaskDTO } from '@model/entities/task';
import type IBlockSettingsItemStore from '@store/modules/settings/block/settings/item/interface';
import type ITaskSettingsListStore from '@store/modules/settings/task/settings/list/interface';
import type ITaskService from '@service/modules/entities/task/interface';

@injectable()
export class TaskSettingsListStore
  extends BaseListStore<ITaskDTO>
  implements ITaskSettingsListStore
{
  @inject(SERVICE.Task) private taskService!: ITaskService;

  @inject(STORE.BlockSettingsItem) private blockItemStore!: IBlockSettingsItemStore;

  getData = async (query?: ParsedUrlQuery) => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.taskService.getTasks(query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data?.filter((d) => {
      return (
        d.document?.name?.toLowerCase()?.includes(searchText || '') ||
        d.block?.name?.toLowerCase()?.includes(searchText || '') ||
        d.block?.title?.toLowerCase()?.includes(searchText || '')
      );
    });
  }

  deleteSubmit = async () => {
    if (this.selectedItems && this.hasSelected) {
      this.setDeleteLoading(true);
      try {
        const res = await this.taskService.deleteTasks(this.selectedItems);
        if (this.blockItemStore.data) await this.getData({ blockId: this.blockItemStore.data.id });
        this.setDeleteOpen(false);
        return res;
      } catch (err) {
      } finally {
        this.setDeleteLoading(false);
      }
    }
  };

  filterName = 'query_tasks';
}
