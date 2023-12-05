import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IUserDTO } from '@model/entities/user';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import { SERVICE } from '@service/ids';
import { UserService } from '@service/modules/entities/user';

@injectable()
export class UserAdminViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IUserAdminViewModel
{
  @inject(SERVICE.User) protected serviceUser!: UserService;

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
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      const data = await this.serviceUser.getUsersAdmin();
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceUser.getUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
