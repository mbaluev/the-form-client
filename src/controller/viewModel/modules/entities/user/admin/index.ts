import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IUserDTO } from '@model/entities/user';
import { UserService } from 'controller/service/modules/entities/user';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

@injectable()
export class UserAdminViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IUserAdminViewModel
{
  @inject(SERVICE.User) protected serviceUser!: UserService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'firstname')) {
          result =
            result ||
            (item.firstname !== undefined &&
              item.firstname !== null &&
              item.firstname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'lastname')) {
          result =
            result ||
            (item.lastname !== undefined &&
              item.lastname !== null &&
              item.lastname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'username')) {
          result =
            result ||
            (item.username !== undefined &&
              item.username !== null &&
              item.username
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
      const data = await this.serviceUser.getUsersAdmin(undefined, token);
      this.setList(data);
    } catch (err) {
    } finally {
    }
  };
}
