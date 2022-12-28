import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, computed, makeObservable, observable } from 'mobx';
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

      signup: action,
      login: action,
      logout: action,
      refreshToken: action,

      isAuth: computed,
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

  // --- action

  signup = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.serviceAuth.signup(this.data);
        this.setToken(data.token);
        await this.clearChanges();
        await this.clearData();
      } finally {
        this.setDataLoading(false);
      }
    }
  };

  login = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.serviceAuth.login(this.data);
        this.setToken(data.token);
        await this.clearChanges();
        await this.clearData();
      } finally {
        this.setDataLoading(false);
      }
    }
  };

  logout = async () => {
    this.setDataLoading(true);
    try {
      await this.serviceAuth.logout();
      this.setToken();
    } finally {
      this.setDataLoading(false);
    }
  };

  refreshToken = async () => {
    try {
      const data = await this.serviceAuth.refreshToken();
      this.setToken(data.token);
    } finally {
      this.setDataLoading(false);
    }
  };

  // --- computed

  get isAuth() {
    return Boolean(this.token);
  }
}
