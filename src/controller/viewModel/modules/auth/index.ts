import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, makeObservable, observable } from 'mobx';
import { IUserDTO } from '@model/user';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import { AuthService } from '@service/modules/auth';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';

@injectable()
export class AuthViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IAuthViewModel
{
  @inject(SERVICE.Auth) protected serviceAuth!: AuthService;

  constructor() {
    super();
    makeObservable(this, {
      token: observable,
      setToken: action,
      login: action,
      signup: action,
    });
    this.setValidations([
      { nameSpace: 'username', type: 'required', message: 'Required' },
      { nameSpace: 'password', type: 'required', message: 'Required' },
    ]);
  }

  // --- observable

  token?: string = undefined;

  setToken = (data?: string) => {
    this.token = data;
  };

  // --- auth

  login = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        await this.serviceAuth.login(this.data);
        await this.clearChanges();
        await this.clearData();
      } finally {
        this.setDataLoading(false);
      }
    }
  };

  signup = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        await this.serviceAuth.signup(this.data);
        await this.clearChanges();
        await this.clearData();
      } finally {
        this.setDataLoading(false);
      }
    }
  };
}
