import { STORE } from '@store/ids';
import { Container } from 'inversify';
import type IFilterStore from '@store/modules/common/filter/interfaces';
import { FilterStore } from '@store/modules/common/filter';
import type IAppStore from '@store/modules/common/app/interface';
import { AppStore } from '@store/modules/common/app';
import type ILanguageStore from '@store/modules/common/language/interface';
import { LanguageStore } from '@store/modules/common/language';
import type ILocaleStore from '@store/modules/common/locale/interface';
import { LocaleStore } from '@store/modules/common/locale';
import type INotifyStore from '@store/modules/common/notify/interface';
import { NotifyStore } from '@store/modules/common/notify';
import type IAuthStore from '@store/modules/common/auth/interface';
import { AuthStore } from '@store/modules/common/auth';
import type ICompanyViewStore from '@store/modules/onboard/company/view/interface';
import { CompanyViewStore } from '@store/modules/onboard/company/view';
import type ICompanyRegisterStore from '@store/modules/onboard/company/register/interface';
import { CompanyRegisterStore } from '@store/modules/onboard/company/register';
import type ITenantsStore from '@store/modules/onboard/tenant/list/interface';
import { TenantsStore } from '@store/modules/onboard/tenant/list';

export const storeContainer = new Container({ defaultScope: 'Singleton' });

// common

storeContainer.bind<IAppStore>(STORE.App).to(AppStore);

storeContainer.bind<IAuthStore>(STORE.Auth).to(AuthStore);

storeContainer.bind<IFilterStore>(STORE.Filter).to(FilterStore);

storeContainer.bind<ILanguageStore>(STORE.Language).to(LanguageStore);

storeContainer.bind<ILocaleStore>(STORE.Locale).to(LocaleStore);

storeContainer.bind<INotifyStore>(STORE.Notify).to(NotifyStore);

// onboard

storeContainer.bind<ICompanyViewStore>(STORE.CompanyView).to(CompanyViewStore);

storeContainer
  .bind<ICompanyRegisterStore>(STORE.CompanyRegister)
  .to(CompanyRegisterStore);

storeContainer.bind<ITenantsStore>(STORE.Tenants).to(TenantsStore);
