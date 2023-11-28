import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, computed, makeObservable, observable } from 'mobx';
import { IUserDTO } from '@model/entities/user';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { AuthService } from 'controller/service/modules/common/auth';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { UserService } from 'controller/service/modules/entities/user';
import { Jwt } from '@utils/jwt';
import { setCookies } from 'cookies-next';
import cookie from '@utils/cookie';

@injectable()
export class AuthViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IAuthViewModel
{
  @inject(SERVICE.Auth) protected serviceAuth!: AuthService;

  @inject(SERVICE.User) protected serviceUser!: UserService;

  constructor() {
    super();
    makeObservable(this, {
      token: observable,
      setToken: action,
      message: observable,
      setMessage: action,

      signup: action,
      signin: action,
      signout: action,
      refreshToken: action,

      isAuth: computed,
      id: computed,
      firstname: computed,
      lastname: computed,
      username: computed,
      roles: computed,

      clearMessage: action,
      clearToken: action,
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

  token?: string | null = undefined;

  setToken = (data?: string | null) => {
    this.token = data;
    setCookies(cookie.names.token, data, cookie.options);
  };

  message?: string | null = undefined;

  setMessage = (data?: string | null) => {
    this.message = data;
  };

  // --- action

  signup = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.serviceAuth.signup(this.data);
        if (data) {
          await this.clearChanges();
          await this.clearData();
          return true;
        }
      } catch (err) {
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  signin = async () => {
    this.validate(['username', 'password']);
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.serviceAuth.signin(this.data);
        if (data && data.token) {
          this.setToken(data.token);
          await this.clearChanges();
          return true;
        } else {
          this.setMessage('Incorrect username or password');
        }
      } catch (err) {
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  signout = async () => {
    this.setDataLoading(true);
    if (this.token) {
      try {
        const ret = await this.serviceAuth.signout(this.token);
        if (ret && ret.success) {
          this.setToken();
          await this.clearData();
          return true;
        }
      } catch (err) {
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  refreshToken = async () => {
    if (this.isAuth) {
      try {
        const data = await this.serviceAuth.refreshToken();
        if (data) {
          this.setToken(data.token);
          return data.token;
        }
      } catch (err) {
        await this.signout();
      } finally {
        this.setDataLoading(false);
      }
    }
  };

  // --- computed

  get isAuth() {
    return Boolean(this.token);
  }

  get id() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.id;
    }
    return undefined;
  }

  get firstname() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.firstname;
    }
    return undefined;
  }

  get lastname() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.lastname;
    }
    return undefined;
  }

  get username() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.username;
    }
    return undefined;
  }

  get roles() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.roles;
    }
    return undefined;
  }

  // --- clear

  clearMessage = async () => {
    try {
      this.setMessage();
    } catch (err) {
    } finally {
    }
  };

  clearToken = async () => {
    try {
      this.setToken();
    } catch (err) {
    } finally {
    }
  };
}
