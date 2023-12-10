import { injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import { action, computed, makeObservable } from 'mobx';
import type IAuthStore from '@store/modules/common/auth/interface';

@injectable()
export class AuthStore extends BaseStore implements IAuthStore {
  constructor() {
    super();
    makeObservable(this, {
      init: action,
      token: computed,
      isAuth: computed,
    });
  }

  init = async () => {
    try {
    } catch (err) {}
  };

  get token() {
    return Promise.resolve('');
  }

  get isAuth() {
    return false;
  }
}
