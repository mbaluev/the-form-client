import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserMessageDTO } from '@model/task';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IFileService } from '@service/modules/file/interface';
import { action, makeObservable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import { ITaskHistoryViewModel } from '@viewModel/modules/task/history/interface';
import _ from 'lodash';

@injectable()
export class TaskHistoryViewModel
  extends BaseCardViewModel<ITaskUserMessageDTO>
  implements ITaskHistoryViewModel
{
  @inject(SERVICE.File) protected serviceFile!: IFileService;

  @inject(VIEW_MODEL.Auth) protected auth!: IAuthViewModel;

  @inject(VIEW_MODEL.BlockUser) protected block!: IBlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      download: action,
    });
  }

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (item: ITaskUserMessageDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'document.name')) {
          result =
            result ||
            (item.document?.name !== undefined &&
              item.document?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document?.description !== undefined &&
              item.document?.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.file.name')) {
          result =
            result ||
            (item.document?.file.name !== undefined &&
              item.document?.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.firstname')) {
          result =
            result ||
            (item.user?.firstname !== undefined &&
              item.user?.firstname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.lastname')) {
          result =
            result ||
            (item.user?.lastname !== undefined &&
              item.user?.lastname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.username')) {
          result =
            result ||
            (item.user?.username !== undefined &&
              item.user?.username
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
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
