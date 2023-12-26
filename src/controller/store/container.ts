import { STORE } from '@store/ids';
import { Container } from 'inversify';
import type IFilterStore from '@store/modules/common/filter/interfaces';
import { FilterStore } from '@store/modules/common/filter';
import type IAppStore from '@store/modules/common/app/interface';
import { AppStore } from '@store/modules/common/app';
import type ILocaleStore from '@store/modules/common/locale/interface';
import { LocaleStore } from '@store/modules/common/locale';
import type INotifyStore from '@store/modules/common/notify/interface';
import { NotifyStore } from '@store/modules/common/notify';
import type IAuthStore from '@store/modules/common/auth/interface';
import { AuthStore } from '@store/modules/common/auth';
import type IMenuStore from '@store/modules/common/menu/interface';
import { MenuStore } from '@store/modules/common/menu';

export const storeContainer = new Container({ defaultScope: 'Singleton' });

// common

storeContainer.bind<IAppStore>(STORE.App).to(AppStore);

storeContainer.bind<IAuthStore>(STORE.Auth).to(AuthStore);

storeContainer.bind<IFilterStore>(STORE.Filter).to(FilterStore);

storeContainer.bind<ILocaleStore>(STORE.Locale).to(LocaleStore);

storeContainer.bind<IMenuStore>(STORE.Menu).to(MenuStore);

storeContainer.bind<INotifyStore>(STORE.Notify).to(NotifyStore);
