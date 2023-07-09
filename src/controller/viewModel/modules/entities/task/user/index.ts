/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import { ITaskUserDTO } from '@model/entities/task';
import { TaskService } from '@service/modules/entities/task';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { action, makeObservable } from 'mobx';

@injectable()
export class TaskUserViewModel
  extends BaseCardViewModel<ITaskUserDTO>
  implements ITaskUserViewModel
{
  @inject(SERVICE.Task) protected serviceTask!: TaskService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.BlockUser) protected block!: BlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      download: action,
    });
  }

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: ITaskUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'document.name')) {
          result =
            result ||
            (item.document.name !== undefined &&
              item.document.name !== null &&
              item.document.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document.description !== undefined &&
              item.document.description !== null &&
              item.document.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  getList = async () => {
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceTask.getTasksUser(
          { userBlockId: this.block.data.id },
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

  // --- actions

  download = async (id: string, filename: string) => {
    try {
      const token = await this.auth.refreshToken();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };
}
