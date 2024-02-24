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
import type IUserSettingsListStore from '@store/modules/settings/user/settings/list/interface';
import { UserSettingsListStore } from '@store/modules/settings/user/settings/list';
import type IUserSettingsItemStore from '@store/modules/settings/user/settings/item/interface';
import { UserSettingsItemStore } from '@store/modules/settings/user/settings/item';
import type IOptionStore from '@store/modules/common/option/interface';
import { OptionStore } from '@store/modules/common/option';
import type IModuleSettingsListStore from '@store/modules/settings/module/settings/list/interface';
import { ModuleSettingsListStore } from '@store/modules/settings/module/settings/list';
import type IModuleSettingsItemStore from '@store/modules/settings/module/settings/item/interface';
import { ModuleSettingsItemStore } from '@store/modules/settings/module/settings/item';
import type IBlockSettingsListStore from '@store/modules/settings/block/settings/list/interface';
import { BlockSettingsListStore } from '@store/modules/settings/block/settings/list';
import type IBlockSettingsItemStore from '@store/modules/settings/block/settings/item/interface';
import { BlockSettingsItemStore } from '@store/modules/settings/block/settings/item';
import type IMaterialSettingsListStore from '@store/modules/settings/material/settings/list/interface';
import { MaterialSettingsListStore } from '@store/modules/settings/material/settings/list';
import type IMaterialSettingsItemStore from '@store/modules/settings/material/settings/item/interface';
import { MaterialSettingsItemStore } from '@store/modules/settings/material/settings/item';
import type IFileStore from '@store/modules/common/file/interface';
import { FileStore } from '@store/modules/common/file';
import type ITaskSettingsListStore from '@store/modules/settings/task/settings/list/interface';
import { TaskSettingsListStore } from '@store/modules/settings/task/settings/list';
import type ITaskSettingsItemStore from '@store/modules/settings/task/settings/item/interface';
import { TaskSettingsItemStore } from '@store/modules/settings/task/settings/item';
import type IQuestionSettingsListStore from '@store/modules/settings/question/settings/list/interface';
import { QuestionSettingsListStore } from '@store/modules/settings/question/settings/list';
import type IQuestionSettingsItemStore from '@store/modules/settings/question/settings/item/interface';
import { QuestionSettingsItemStore } from '@store/modules/settings/question/settings/item';

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

// settings

storeContainer.bind<IUserSettingsListStore>(STORE.UserSettingsList).to(UserSettingsListStore);

storeContainer.bind<IUserSettingsItemStore>(STORE.UserSettingsItem).to(UserSettingsItemStore);

storeContainer.bind<IModuleSettingsListStore>(STORE.ModuleSettingsList).to(ModuleSettingsListStore);

storeContainer.bind<IModuleSettingsItemStore>(STORE.ModuleSettingsItem).to(ModuleSettingsItemStore);

storeContainer.bind<IBlockSettingsListStore>(STORE.BlockSettingsList).to(BlockSettingsListStore);

storeContainer.bind<IBlockSettingsItemStore>(STORE.BlockSettingsItem).to(BlockSettingsItemStore);

storeContainer
  .bind<IMaterialSettingsListStore>(STORE.MaterialSettingsList)
  .to(MaterialSettingsListStore);

storeContainer
  .bind<IMaterialSettingsItemStore>(STORE.MaterialSettingsItem)
  .to(MaterialSettingsItemStore);

storeContainer.bind<ITaskSettingsListStore>(STORE.TaskSettingsList).to(TaskSettingsListStore);

storeContainer.bind<ITaskSettingsItemStore>(STORE.TaskSettingsItem).to(TaskSettingsItemStore);

storeContainer
  .bind<IQuestionSettingsListStore>(STORE.QuestionSettingsList)
  .to(QuestionSettingsListStore);

storeContainer
  .bind<IQuestionSettingsItemStore>(STORE.QuestionSettingsItem)
  .to(QuestionSettingsItemStore);

// user

// progress
