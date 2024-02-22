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
import type IUserListStore from '@store/modules/entities/user/list/interface';
import { UserListStore } from '@store/modules/entities/user/list';
import type IUserItemStore from '@store/modules/entities/user/item/interface';
import { UserItemStore } from '@store/modules/entities/user/item';
import type IOptionStore from '@store/modules/common/option/interface';
import { OptionStore } from '@store/modules/common/option';
import type IModuleListStore from '@store/modules/entities/module/list/interface';
import { ModuleListStore } from '@store/modules/entities/module/list';
import type IModuleItemStore from '@store/modules/entities/module/item/interface';
import { ModuleItemStore } from '@store/modules/entities/module/item';
import type IBlockListStore from '@store/modules/entities/block/list/interface';
import { BlockListStore } from '@store/modules/entities/block/list';
import type IBlockItemStore from '@store/modules/entities/block/item/interface';
import { BlockItemStore } from '@store/modules/entities/block/item';
import type IMaterialListStore from '@store/modules/entities/material/list/interface';
import { MaterialListStore } from '@store/modules/entities/material/list';
import type IMaterialItemStore from '@store/modules/entities/material/item/interface';
import { MaterialItemStore } from '@store/modules/entities/material/item';
import type IFileStore from '@store/modules/common/file/interface';
import { FileStore } from '@store/modules/common/file';

export const storeContainer = new Container({ defaultScope: 'Singleton' });

// common

storeContainer.bind<IAppStore>(STORE.App).to(AppStore);

storeContainer.bind<IAuthStore>(STORE.Auth).to(AuthStore);

storeContainer.bind<IFileStore>(STORE.File).to(FileStore);

storeContainer.bind<IFilterStore>(STORE.Filter).to(FilterStore);

storeContainer.bind<ILocaleStore>(STORE.Locale).to(LocaleStore);

storeContainer.bind<IMenuStore>(STORE.Menu).to(MenuStore);

storeContainer.bind<INotifyStore>(STORE.Notify).to(NotifyStore);

storeContainer.bind<IOptionStore>(STORE.Option).to(OptionStore);

// entities

storeContainer.bind<IUserListStore>(STORE.UserList).to(UserListStore);

storeContainer.bind<IUserItemStore>(STORE.UserItem).to(UserItemStore);

storeContainer.bind<IModuleListStore>(STORE.ModuleList).to(ModuleListStore);

storeContainer.bind<IModuleItemStore>(STORE.ModuleItem).to(ModuleItemStore);

storeContainer.bind<IBlockListStore>(STORE.BlockList).to(BlockListStore);

storeContainer.bind<IBlockItemStore>(STORE.BlockItem).to(BlockItemStore);

storeContainer.bind<IMaterialListStore>(STORE.MaterialList).to(MaterialListStore);

storeContainer.bind<IMaterialItemStore>(STORE.MaterialItem).to(MaterialItemStore);
