/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import _ from 'lodash';
import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { ParsedUrlQuery } from 'querystring';
import { ITaskUserDTO } from '@model/entities/task';
import { TaskService } from '@service/modules/entities/task';
import { ITaskBaseViewModel } from '@viewModel/modules/entities/task/base/interface';

@injectable()
export class TaskBaseViewModel
  extends BaseCardViewModel<ITaskUserDTO>
  implements ITaskBaseViewModel
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
      } else {
        result = true;
      }
      return result;
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
