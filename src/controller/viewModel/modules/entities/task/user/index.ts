import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { TaskBaseViewModel } from '@viewModel/modules/entities/task/base';

@injectable()
export class TaskUserViewModel
  extends TaskBaseViewModel
  implements ITaskUserViewModel
{
  @inject(VIEW_MODEL.BlockUser) protected userBlock!: BlockUserViewModel;

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const token = await this.auth.verify();
        const data = await this.serviceTask.getTasksUser(
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
      const token = await this.auth.verify();
      const data = await this.serviceTask.getTaskUser(id, undefined, token);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
