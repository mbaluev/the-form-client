import { inject, injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { STORE } from '@store/ids';
import { TaskBaseStore } from '@store/modules/settings/task/_/base';
import type ITaskUserStore from '@store/modules/settings/task/_/user/interface';
import type IBlockUserStore from '@store/modules/_/block/user/interface';

@injectable()
export class TaskUserStore extends TaskBaseStore implements ITaskUserStore {
  @inject(STORE.BlockUser) protected blockUserStore!: IBlockUserStore;

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.blockUserStore.data) {
        const data = await this.serviceTask.getTasksUser({
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
      const data = await this.serviceTask.getTaskUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
