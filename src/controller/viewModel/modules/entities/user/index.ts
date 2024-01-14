import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { IUserDTO } from '@model/entities/user';
import { UserService } from 'controller/service/modules/entities/user';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class UserViewModel extends BaseCardViewModel<IUserDTO> implements IUserViewModel {
  @inject(SERVICE.User) protected serviceUser!: UserService;

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
        await this.getList();
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
        await this.getList();
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
        await this.getList();
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
