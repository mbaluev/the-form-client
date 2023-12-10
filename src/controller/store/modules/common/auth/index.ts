import { inject, injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import { STORE } from '@store/ids';
import { action, computed, makeObservable, observable } from 'mobx';
import {
  b2cPolicies,
  loginRequest,
  msalConfig,
  tokenRequest,
} from '@settings/msal';
import {
  AuthInteractionRequiredErrors,
  IAccount,
  TAuthProvider,
} from '@model/common/auth';
import type IAuthStore from '@store/modules/common/auth/interface';
import type ILocaleStore from '@store/modules/common/locale/interface';
import type INotifyStore from '@store/modules/common/notify/interface';
import {
  AccountInfo,
  AuthError,
  InteractionRequiredAuthError,
  IPublicClientApplication,
  PublicClientApplication,
  RedirectRequest,
  SilentRequest,
} from '@azure/msal-browser';

@injectable()
export class AuthStore extends BaseStore implements IAuthStore {
  @inject(STORE.Locale) private localeStore!: ILocaleStore;

  @inject(STORE.Notify) private notifyStore!: INotifyStore;

  constructor() {
    super();
    makeObservable(this, {
      instance: observable,
      setInstance: action,

      isAuth: computed,
      isExpired: computed,

      currentAccountId: observable,
      currentAccount: computed,
      accounts: observable,
      otherAccounts: computed,
      token: computed,

      setCurrentAccountId: action,
      setAccounts: action,
      setAccount: action,

      signIn: action,
      signOut: action,
    });
  }

  // instance

  instance: IPublicClientApplication = new PublicClientApplication(msalConfig);

  setInstance = (value: IPublicClientApplication) => (this.instance = value);

  // observable

  currentAccountId?: string = undefined;

  accounts?: IAccount[] = undefined;

  setCurrentAccountId = (value?: string) => {
    this.currentAccountId = value;
  };

  setAccounts = (value?: IAccount[]) => {
    this.accounts = value;
  };

  setAccount = async (value: AccountInfo) => {
    this.instance.setActiveAccount(value);
    this.setCurrentAccountId(value.homeAccountId);
  };

  // computed

  get isAuth() {
    if (!this.currentAccount) return false;
    return Boolean(!this.currentAccount.expired);
  }

  get isExpired() {
    if (!this.currentAccount) return false;
    return Boolean(this.currentAccount.expired);
  }

  get currentAccount() {
    return this.accounts?.find((data) => data.id === this.currentAccountId);
  }

  get otherAccounts() {
    return this.accounts?.filter((data) => data.id !== this.currentAccountId);
  }

  get token() {
    return this.requestAccessToken();
  }

  // msal

  init = async () => {
    if (typeof window !== 'undefined') {
      try {
        await this.instance.initialize();
        const response = await this.instance.handleRedirectPromise();
        if (response && this.isResponseSUSI(response)) {
          await this.handleResponse(response);
        } else {
          await this.handleResponse(null);
        }
      } catch (err) {}
    }
  };

  handleResponse = async (response: any) => {
    if (response !== null) {
      await this.setAccount(response.account);
    } else {
      await this.selectAccount();
    }
    await this.getAccounts();
  };

  isResponseSUSI = (response: any) => {
    return (
      response &&
      response.authority
        .toUpperCase()
        .includes(b2cPolicies.names.signUpSignIn.toUpperCase())
    );
  };

  selectAccount = async () => {
    const accounts = this.instance.getAllAccounts().filter(this.filterAccount);
    if (accounts.length < 1) {
      return;
    } else if (accounts.length >= 1) {
      const activeAccount = this.instance.getActiveAccount();
      if (activeAccount) {
        await this.setAccount(activeAccount);
      } else {
        await this.setAccount(accounts[0]);
      }
    }
  };

  // sign in, sign out

  signIn = async (id?: string) => {
    try {
      if (id) {
        const account = this.instance.getAccountByHomeId(id);
        await this.setAccount(account as AccountInfo);
      } else {
        await this.instance.loginRedirect({
          ...loginRequest,
          extraQueryParameters: {
            ui_locales: this.localeStore.language,
          },
        });
      }
    } catch (err) {
      this.notifyStore.add(err);
    }
  };

  signOut = async (id?: string) => {
    try {
      const logoutRequest = {
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
      };
      const accountId = id || this.currentAccountId;
      if (accountId === 'all') {
        await this.instance.logoutRedirect(logoutRequest);
      } else if (accountId) {
        const account = this.instance.getAccountByHomeId(accountId);
        await this.instance.logoutRedirect({
          ...logoutRequest,
          account: account as AccountInfo,
        });
      } else {
        await this.instance.logoutRedirect(logoutRequest);
      }
    } catch (err) {
      this.notifyStore.add(err);
    }
  };

  signInExpired = async () => {
    try {
      if (this.currentAccount?.expired) {
        const request: RedirectRequest = loginRequest;
        await this.instance.loginRedirect(request);
      }
    } catch (err) {
      this.notifyStore.add(err);
    }
  };

  // get accounts

  getAccounts = async () => {
    this.setAccounts();
    try {
      const promises = this.instance
        .getAllAccounts()
        .filter(this.filterAccount)
        .map(this.mapAccount);
      const data = await Promise.all(promises);
      this.setAccounts(data);
    } catch (err) {
      this.notifyStore.add(err);
    }
  };

  filterAccount = (data: AccountInfo) => {
    const idTokenClaims = data.idTokenClaims as Record<string, any>;
    return (
      data.homeAccountId
        .toUpperCase()
        .includes(b2cPolicies.names.signUpSignIn.toUpperCase()) &&
      idTokenClaims?.iss
        .toUpperCase()
        .includes(b2cPolicies.authorityDomain.toUpperCase()) &&
      idTokenClaims?.aud === msalConfig.auth.clientId
    );
  };

  mapAccount = async (data: AccountInfo): Promise<IAccount> => {
    const account: IAccount = {};
    const claims = data?.idTokenClaims as Record<string, any>;
    account.id = data.homeAccountId;
    account.companyId = claims.company_id;
    account.companyName = claims.company;
    account.name = data.name;
    account.email = claims.email;
    account.groups = claims.groups;
    account.roles = claims.roles;
    account.provider = this.getAccountAuthProvider(claims);
    account.photo = this.getAccountPhoto(claims, account.provider);
    await this.getAccountToken(account.id)
      .then(() => (account.expired = false))
      .catch(
        (error: AuthError) =>
          (account.expired = this.handleSessionExpired(error))
      );
    return account;
  };

  // get account helpers

  getAccountAuthProvider = (claims: any): TAuthProvider | undefined => {
    const idp = claims.idp;
    if (!idp) return 'email';
    if (idp.toLowerCase().indexOf('facebook') >= 0) return 'facebook';
    if (idp.toLowerCase().indexOf('google') >= 0) return 'google';
    if (idp.toLowerCase().indexOf('linkedin') >= 0) return 'linkedin';
    if (idp.toLowerCase().indexOf('login.live.com') >= 0) return 'ms private';
    return 'ms work';
  };

  getAccountPhoto = (claims: any, provider?: string) => {
    if (provider === 'facebook') {
      const picture = JSON.parse(claims.picture);
      return picture.data.url;
    }
    return claims.picture;
  };

  getAccountToken = (homeAccountId?: string) => {
    const request: SilentRequest = tokenRequest;
    const id = homeAccountId || this.currentAccountId;
    const account = this.instance.getAccountByHomeId(id as string);
    request.account = account || undefined;
    return this.instance.acquireTokenSilent(request).then((response: any) => {
      if (!response.accessToken || response.accessToken === '') {
        throw new InteractionRequiredAuthError('interaction_required');
      }
      return response.accessToken;
    });
  };

  // request token

  requestAccessToken = (homeAccountId?: string) => {
    return this.getAccountToken(homeAccountId).catch((error: AuthError) => {
      this.handleTokenError(error, homeAccountId);
    });
  };

  handleTokenError = (error: AuthError, accountId?: string) => {
    const id = accountId || this.currentAccountId;
    if (this.accounts) {
      const accounts = [...this.accounts];
      accounts.forEach((account) => {
        if (account && account.id === id)
          account.expired = this.handleSessionExpired(error);
      });
      this.setAccounts(accounts);
    }
  };

  handleSessionExpired = (error: AuthError) => {
    return AuthInteractionRequiredErrors.includes(error.errorCode);
  };
}
