import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { TaskBaseViewModel } from '@viewModel/modules/entities/task/base';
import { ParsedUrlQuery } from 'querystring';

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
        const data = await this.serviceTask.getTasksUser({
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
      const data = await this.serviceTask.getTaskUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
