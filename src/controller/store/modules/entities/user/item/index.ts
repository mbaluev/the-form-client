import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IUserDTO } from '@model/entities/user';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { STORE } from '@store/ids';
import type IUserItemStore from '@store/modules/entities/user/item/interface';
import type IUserListStore from '@store/modules/entities/user/list/interface';
import type IUserService from '@service/modules/entities/user/interface';

@injectable()
export class UserItemStore extends BaseCardStore<IUserDTO> implements IUserItemStore {
  @inject(SERVICE.User) protected userService!: IUserService;

  @inject(STORE.UserList) protected userListStore!: IUserListStore;

  constructor() {
    super();
    this.setValidations([
      { nameSpace: 'firstname', type: 'required', message: 'Required' },
      { nameSpace: 'lastname', type: 'required', message: 'Required' },
      { nameSpace: 'username', type: 'required', message: 'Required' },
      { nameSpace: 'username', type: 'email', message: 'Not correct email' },
      { nameSpace: 'password', type: 'required', message: 'Required' },
    ]);
  }

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.userService.getUsers(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.userService.getUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async (data?: IUserDTO) => {
    this.setSaveLoading(true);
    try {
      if (data) {
        const res = await this.userService.saveUser(data);
        await this.userListStore.getData();
        return res;
      }
    } catch (err) {
    } finally {
      this.setSaveLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.userService.deleteUsers(this.deleteIds);
        await this.userListStore.getData();
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
