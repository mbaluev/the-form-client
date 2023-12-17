import { inject, injectable } from 'inversify';
import { BaseCardStore } from '@store/modules/base/card';
import IAuthStore from '@store/modules/common/auth/interface';
import { SERVICE } from '@service/ids';
import { action, computed, makeObservable, observable } from 'mobx';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import cookie from '@utils/cookie';
import moment from 'moment';
import { Jwt } from '@utils/jwt';
import { AuthService } from '@service/modules/common/auth';
import { IAccountDTO } from '@model/common/auth';

@injectable()
export class AuthStore extends BaseCardStore<IAccountDTO> implements IAuthStore {
  @inject(SERVICE.Auth) protected authService!: AuthService;

  constructor() {
    super();
    makeObservable(this, {
      token: observable,
      setToken: action,
      deleteToken: action,
      message: observable,
      setMessage: action,

      signUp: action,
      signIn: action,
      signOut: action,
      verify: action,

      isAuth: computed,
      id: computed,
      firstname: computed,
      lastname: computed,
      username: computed,
      roles: computed,
      exp: computed,

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
    setCookie(cookie.names.token, data, cookie.options);
  };

  deleteToken = () => {
    this.token = undefined;
    deleteCookie(cookie.names.token);
  };

  message?: string = undefined;

  setMessage = (data?: string) => {
    this.message = data;
  };

  // --- action

  init = () => {
    this.setToken(getCookie(cookie.names.token) as string);
  };

  signUp = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.authService.signUp(this.data);
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

  signIn = async () => {
    this.validate(['username', 'password']);
    if (this.data && !this.hasErrors) {
      await this.clearChanges();
      this.setDataLoading(true);
      try {
        const data = await this.authService.signIn(this.data);
        if (data.token) {
          this.setToken(data.token);
          return true;
        } else {
          this.deleteToken();
          this.setMessage('Incorrect username or password');
        }
      } catch (err) {
        this.deleteToken();
        this.setMessage('Incorrect username or password');
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  signOut = async () => {
    this.setDataLoading(true);
    try {
      const ret = await this.authService.signOut();
      if (ret && ret.success) {
        this.deleteToken();
        await this.clearData();
        return true;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
    return false;
  };

  verify = async () => {
    const valid = moment(this.exp).isAfter();
    if (!valid) this.deleteToken();
    return this.token;
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

  get exp() {
    if (this.token) {
      const exp = new Jwt(this.token).decodedClaims?.exp;
      if (exp) {
        return new Date(Number(`${exp}000`));
      }
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
      this.deleteToken();
    } catch (err) {
    } finally {
    }
  };
}
