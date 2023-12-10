import NProgress from 'nprogress';
import { action, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import { STORE } from '@store/ids';
import { NextRouter } from 'next/router';
import type IAppStore from '@store/modules/common/app/interface';
import type INotifyStore from '@store/modules/common/notify/interface';

@injectable()
export class AppStore extends BaseStore implements IAppStore {
  @inject(STORE.Notify) private notifyStore!: INotifyStore;

  constructor() {
    super();
    makeObservable(this, {
      // router
      router: observable,
      setRouter: action,
      changeRoute: action,

      // init
      init: action,
      navHeight: observable,
      setNavHeight: action,
      barVisible: observable,
      setBarVisible: action,
      barHeight: observable,
      setBarHeight: action,
    });
    this.setLoading(true);
  }

  // router

  router?: NextRouter = undefined;

  setRouter = (value?: NextRouter) => (this.router = value);

  changeRoute = (value?: NextRouter) => this.setRouter(value);

  // init

  init = async () => {
    try {
      // await this.authStore.init();
    } catch (err) {
      this.notifyStore.add(err);
    } finally {
      this.setLoading(false);
    }
  };

  routeChangeStart = (): void => {
    NProgress.start();
  };

  routeChangeComplete = (): void => {
    NProgress.done();
  };

  // nav

  navHeight: number = 0;

  setNavHeight = (value: number) => (this.navHeight = value);

  // bar

  barVisible: boolean = false;

  setBarVisible = (value: boolean) => (this.barVisible = value);

  barHeight: number = 0;

  setBarHeight = (value: number) => (this.barHeight = value);
}
