import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { BlockAdminViewModel } from '@viewModel/modules/entities/block/admin';
import { TaskBaseViewModel } from '@viewModel/modules/entities/task/base';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class TaskAdminViewModel extends TaskBaseViewModel implements ITaskAdminViewModel {
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: BlockAdminViewModel;

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
      if (this.userBlock.data) {
        const data = await this.serviceTask.getTasksAdmin({
          userBlockId: this.userBlock.data.id,
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
        if (this.userBlock.data) {
          const blockId = this.userBlock.data.id;
          await this.userBlock.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
    }
  };
}
