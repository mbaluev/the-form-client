import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { IUserDTO } from '@model/user';
import { UserService } from '@service/modules/user';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';

@injectable()
export class UserViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IUserViewModel
{
  @inject(SERVICE.User) protected serviceUser!: UserService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

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
    } finally {
    }
  };

  // --- override

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceUser.saveUser(this.data, token);
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
        const token = await this.auth.refreshToken();
        const data = await this.serviceUser.saveUser(this.modalData, token);
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
        const token = await this.auth.refreshToken();
        const data = await this.serviceUser.deleteUsers(this.deleteIds, token);
        if (data) {
          this.removeFromList(this.deleteIds);
          await this.clearDelete();
          await this.clearData();
        }
        return data;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
