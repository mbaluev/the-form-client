import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { ITaskUserDTO } from '@model/entities/task';
import type IBlockSchoolItemStore from '@store/modules/school/block/item/interface';
import type ITaskSchoolListStore from '@store/modules/school/task/list/interface';
import type ITaskService from '@service/modules/entities/task/interface';

@injectable()
export class TaskSchoolListStore
  extends BaseListStore<ITaskUserDTO>
  implements ITaskSchoolListStore
{
  @inject(SERVICE.Task) private taskService!: ITaskService;

  @inject(STORE.BlockSchoolItem) protected blockUserStore!: IBlockSchoolItemStore;

  getData = async () => {
    this.setData();
    this.setLoading(true);
    try {
      if (this.blockUserStore.data) {
        const data = await this.taskService.getTasksUser({
          userBlockId: this.blockUserStore.data.id,
        });
        this.setData(data);
      }
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
          d.task?.document?.id?.toLowerCase()?.includes(searchText || '') ||
          d.task?.document?.name?.toLowerCase()?.includes(searchText || '') ||
          d.task?.document?.url?.toLowerCase()?.includes(searchText || '') ||
          d.task?.document?.file?.name?.toLowerCase()?.includes(searchText || '') ||
          d.task?.document?.file?.id?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.sort((a, b) =>
        a.task?.document && b.task?.document && a.task?.document.name > b.task?.document.name
          ? 1
          : 0
      );
  }

  filterName = 'query_task_school';
}
