import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { BlockAdminViewModel } from '@viewModel/modules/entities/block/admin';
import { TaskBaseViewModel } from '@viewModel/modules/entities/task/base';

@injectable()
export class TaskAdminViewModel
  extends TaskBaseViewModel
  implements ITaskAdminViewModel
{
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
        const token = await this.auth.refreshToken();
        const data = await this.serviceTask.getTasksAdmin(
          { userBlockId: this.userBlock.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id: string) => {
    this.setDataLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceTask.getTaskAdmin(id, undefined, token);
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
        const token = await this.auth.refreshToken();
        await this.serviceTask.completeAdmin(this.data.id, token);
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
