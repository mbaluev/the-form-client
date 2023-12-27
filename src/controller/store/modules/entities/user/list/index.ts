import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IUserDTO } from '@model/entities/user';
import type IUserListStore from '@store/modules/entities/user/list/interface';
import type IUserService from '@service/modules/entities/user/interface';

@injectable()
export class UserListStore extends BaseListStore<IUserDTO> implements IUserListStore {
  @inject(SERVICE.User) private userService!: IUserService;

  getData = async () => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.userService.getUsers();
      this.setData(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters.query?.toLowerCase();
    return this.data
      ?.filter((d) => {
        return (
          d.username?.toLowerCase()?.includes(searchText || '') ||
          d.firstname?.toLowerCase()?.includes(searchText || '') ||
          d.lastname?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.sort((a, b) => (a.username && b.username ? a.username.localeCompare(b.username) : 0));
  }

  filterName = 'query';
}
