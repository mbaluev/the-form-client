import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, makeObservable, observable } from 'mobx';
import { IUserDTO } from '@model/entities/user';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { STORE } from '@store/ids';
import type IUserItemStore from '@store/modules/entities/user/item/interface';
import type IUserListStore from '@store/modules/entities/user/list/interface';
import type IUserService from '@service/modules/entities/user/interface';

@injectable()
export class UserItemStore extends BaseCardStore<IUserDTO> implements IUserItemStore {
  @inject(SERVICE.User) protected serviceUser!: IUserService;

  @inject(STORE.UserList) protected userListStore!: IUserListStore;

  constructor() {
    super();
    makeObservable(this, {
      userData: observable,
      setUserData: action,
      clearUserData: action,
    });
    this.setValidations([
      { nameSpace: 'firstname', type: 'required', message: 'Required' },
      { nameSpace: 'lastname', type: 'required', message: 'Required' },
      { nameSpace: 'username', type: 'required', message: 'Required' },
      { nameSpace: 'username', type: 'email', message: 'Not correct email' },
      { nameSpace: 'password', type: 'required', message: 'Required' },
    ]);
  }

  // --- observable

  userData?: IUserDTO | null = undefined;

  setUserData = (data?: IUserDTO | null) => {
    this.userData = data;
  };

  clearUserData = async () => {
    try {
      this.setUserData();
    } catch (err) {
    } finally {
    }
  };

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.serviceUser.getUsers(query);
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
      this.setUserData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const data = await this.serviceUser.saveUser(this.data);
        await this.userListStore.getData();
        await this.clearChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const data = await this.serviceUser.saveUser(this.modalData);
        await this.userListStore.getData();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.serviceUser.deleteUsers(this.deleteIds);
        await this.userListStore.getData();
        await this.clearDelete();
        await this.clearData();
        await this.clearUserData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
