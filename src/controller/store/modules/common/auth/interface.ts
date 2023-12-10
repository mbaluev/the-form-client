import type IBaseStore from '@store/modules/base/store/interface';
import type { IPublicClientApplication } from '@azure/msal-browser';
import type { IAccount } from '@model/common/auth';

export default interface IAuthStore extends IBaseStore {
  isAuth: boolean;
  isExpired: boolean;

  currentAccountId?: string;
  currentAccount?: IAccount;
  accounts?: IAccount[];
  otherAccounts?: IAccount[];
  token: Promise<string>;

  instance: IPublicClientApplication;
  init: () => Promise<void>;

  signIn: (id?: string) => void;
  signOut: (id?: string) => void;
  signInExpired: () => void;
}
