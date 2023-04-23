import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { ITaskUserDTO } from '@model/task';
import { ITaskService } from '@service/modules/task/interface';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IFileService } from '@service/modules/file/interface';
import { action, makeObservable } from 'mobx';

@injectable()
export class TaskUserViewModel
  extends BaseCardViewModel<ITaskUserDTO>
  implements ITaskUserViewModel
{
  @inject(SERVICE.Task) protected serviceTask!: ITaskService;

  @inject(SERVICE.File) protected serviceFile!: IFileService;

  @inject(VIEW_MODEL.Auth) protected auth!: IAuthViewModel;

  @inject(VIEW_MODEL.BlockUser) protected block!: IBlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      download: action,
    });
  }

  // --- override

  getList = async () => {
    await this.clearList();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceTask.getTasksUser(
          { blockId: this.block.data.id },
          token
        );
        data?.forEach((d) => (d.expanded = true));
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  download = async (id: string, filename: string) => {
    try {
      const token = await this.auth.refreshToken();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };
}
