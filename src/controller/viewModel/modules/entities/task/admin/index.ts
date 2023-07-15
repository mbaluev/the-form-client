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
import { TaskService } from '@service/modules/entities/task';
import { action, makeObservable } from 'mobx';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { ITaskUserDTO } from '@model/entities/task';

@injectable()
export class TaskAdminViewModel
  extends BaseCardViewModel<ITaskUserDTO>
  implements ITaskAdminViewModel
{
  @inject(SERVICE.Task) protected serviceTask!: TaskService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

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
        if (_.has(item, 'task.document.name')) {
          result =
            result ||
            (item.task?.document?.name !== undefined &&
              item.task?.document?.name !== null &&
              item.task?.document?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'task.document.description')) {
          result =
            result ||
            (item.task?.document?.description !== undefined &&
              item.task?.document?.description !== null &&
              item.task?.document?.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'task.document.url')) {
          result =
            result ||
            (item.task?.document?.url !== undefined &&
              item.task?.document?.url !== null &&
              item.task?.document?.url
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'task.document.file.name')) {
          result =
            result ||
            (item.task?.document?.file.name !== undefined &&
              item.task?.document?.file.name !== null &&
              item.task?.document?.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.firstname')) {
          result =
            result ||
            (item.user?.firstname !== undefined &&
              item.user?.firstname !== null &&
              item.user?.firstname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.lastname')) {
          result =
            result ||
            (item.user?.lastname !== undefined &&
              item.user?.lastname !== null &&
              item.user?.lastname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.username')) {
          result =
            result ||
            (item.user?.username !== undefined &&
              item.user?.username !== null &&
              item.user?.username
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
      const token = await this.auth.refreshToken();
      const data = await this.serviceTask.getTasksAdmin(undefined, token);
      this.setList(data);
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

  download = async (id: string, filename: string) => {
    try {
      const token = await this.auth.refreshToken();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };

  complete = async () => {
    try {
      if (this.data) {
        const token = await this.auth.refreshToken();
        await this.serviceTask.completeAdmin(this.data.id, token);
      }
    } catch (err) {
    } finally {
    }
  };
}
