import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { TaskBaseStore } from '@store/modules/_/task/base';
import { STORE } from '@store/ids';
import type ITaskAdminStore from '@store/modules/_/task/admin/interface';
import type IBlockAdminStore from '@store/modules/_/block/admin/interface';

@injectable()
export class TaskAdminStore extends TaskBaseStore implements ITaskAdminStore {
  @inject(STORE.BlockAdmin) protected blockAdminStore!: IBlockAdminStore;

  constructor() {
    super();
    makeObservable(this, {
      complete: action,
    });
  }

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.blockAdminStore.data) {
        const data = await this.serviceTask.getTasksAdmin({
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
      const data = await this.serviceTask.getTaskAdmin(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  // --- actions

  complete = async () => {
    try {
      if (this.data) {
        await this.serviceTask.completeAdmin(this.data.id);
        if (this.blockAdminStore.data) {
          const blockId = this.blockAdminStore.data.id;
          await this.blockAdminStore.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
    }
  };
}
