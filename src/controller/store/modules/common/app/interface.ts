import type IBaseStore from '@store/modules/base/store/interface';
import { NextRouter } from 'next/router';

export default interface IAppStore extends IBaseStore {
  router?: NextRouter;
  setRouter: (value?: NextRouter) => void;
  changeRoute: (value?: NextRouter) => void;

  init: () => Promise<void>;
  routeChangeStart: () => void;
  routeChangeComplete: () => void;

  navHeight: number;
  setNavHeight: (value: number) => void;

  barVisible: boolean;
  setBarVisible: (value: boolean) => void;

  barHeight: number;
  setBarHeight: (value: number) => void;
}
