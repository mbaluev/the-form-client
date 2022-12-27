import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { IUserDTO } from '@model/user';
import { UserService } from '@service/modules/user';

@injectable()
export class UserViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IUserViewModel
{
  @inject(SERVICE.User) protected serviceUser!: UserService;

  constructor() {
    super();
    makeObservable(this, {
      userData: observable,
      setUserData: action,
      clearUserData: action,
    });
    this.setValidations([
      { nameSpace: 'username', type: 'required', message: 'Required' },
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
    } finally {
    }
  };

  // --- override

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const data = await this.serviceUser.saveUser(this.data);
        if (data) {
          this.updateFromList(data);
          await this.clearChanges();
        }
        return data;
      }
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const data = await this.serviceUser.saveUser(this.modalData);
        if (data) {
          this.updateFromList(data);
          await this.clearModalChanges();
        }
        return data;
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.serviceUser.deleteUsers(this.deleteIds);
        this.removeFromList(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
