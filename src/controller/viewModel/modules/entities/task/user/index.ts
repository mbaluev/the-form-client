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
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const token = await this.auth.refreshToken();
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
      const token = await this.auth.refreshToken();
      const data = await this.serviceTask.getTaskUser(id, undefined, token);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
