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
import type IUserSettingsListStore from '@store/modules/settings/user/list/interface';
import { UserSettingsListStore } from 'controller/store/modules/settings/user/list';
import type IUserSettingsItemStore from '@store/modules/settings/user/item/interface';
import { UserSettingsItemStore } from 'controller/store/modules/settings/user/item';
import type IOptionStore from '@store/modules/common/option/interface';
import { OptionStore } from '@store/modules/common/option';
import type IModuleSettingsListStore from '@store/modules/settings/module/list/interface';
import { ModuleSettingsListStore } from 'controller/store/modules/settings/module/list';
import type IModuleSettingsItemStore from '@store/modules/settings/module/item/interface';
import { ModuleSettingsItemStore } from 'controller/store/modules/settings/module/item';
import type IBlockSettingsListStore from '@store/modules/settings/block/list/interface';
import { BlockSettingsListStore } from 'controller/store/modules/settings/block/list';
import type IBlockSettingsItemStore from '@store/modules/settings/block/item/interface';
import { BlockSettingsItemStore } from 'controller/store/modules/settings/block/item';
import type IMaterialSettingsListStore from '@store/modules/settings/material/list/interface';
import { MaterialSettingsListStore } from 'controller/store/modules/settings/material/list';
import type IMaterialSettingsItemStore from '@store/modules/settings/material/item/interface';
import { MaterialSettingsItemStore } from 'controller/store/modules/settings/material/item';
import type IFileStore from '@store/modules/common/file/interface';
import { FileStore } from '@store/modules/common/file';
import type ITaskSettingsListStore from '@store/modules/settings/task/list/interface';
import { TaskSettingsListStore } from 'controller/store/modules/settings/task/list';
import type ITaskSettingsItemStore from '@store/modules/settings/task/item/interface';
import { TaskSettingsItemStore } from 'controller/store/modules/settings/task/item';
import type IQuestionSettingsListStore from '@store/modules/settings/question/list/interface';
import { QuestionSettingsListStore } from 'controller/store/modules/settings/question/list';
import type IQuestionSettingsItemStore from '@store/modules/settings/question/item/interface';
import { QuestionSettingsItemStore } from 'controller/store/modules/settings/question/item';
import type IModuleSchoolListStore from '@store/modules/school/module/list/interface';
import { ModuleSchoolListStore } from '@store/modules/school/module/list';
import type IModuleSchoolItemStore from '@store/modules/school/module/item/interface';
import { ModuleSchoolItemStore } from '@store/modules/school/module/item';
import type IBlockSchoolItemStore from '@store/modules/school/block/item/interface';
import { BlockSchoolItemStore } from '@store/modules/school/block/item';
import type IMaterialSchoolListStore from '@store/modules/school/material/list/interface';
import { MaterialSchoolListStore } from '@store/modules/school/material/list';
import type IMaterialSchoolItemStore from '@store/modules/school/material/item/interface';
import { MaterialSchoolItemStore } from '@store/modules/school/material/item';
import type ITaskSchoolListStore from '@store/modules/school/task/list/interface';
import { TaskSchoolListStore } from '@store/modules/school/task/list';
import type ITaskSchoolItemStore from '@store/modules/school/task/item/interface';
import { TaskSchoolItemStore } from '@store/modules/school/task/item';
import type IQuestionSchoolItemStore from '@store/modules/school/question/item/interface';
import { QuestionSchoolItemStore } from '@store/modules/school/question/item';
import type IQuestionSchoolListStore from '@store/modules/school/question/list/interface';
import { QuestionSchoolListStore } from '@store/modules/school/question/list';

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

// school

storeContainer.bind<IModuleSchoolListStore>(STORE.ModuleSchoolList).to(ModuleSchoolListStore);

storeContainer.bind<IModuleSchoolItemStore>(STORE.ModuleSchoolItem).to(ModuleSchoolItemStore);

storeContainer.bind<IBlockSchoolItemStore>(STORE.BlockSchoolItem).to(BlockSchoolItemStore);

storeContainer.bind<IMaterialSchoolListStore>(STORE.MaterialSchoolList).to(MaterialSchoolListStore);

storeContainer.bind<IMaterialSchoolItemStore>(STORE.MaterialSchoolItem).to(MaterialSchoolItemStore);

storeContainer.bind<ITaskSchoolListStore>(STORE.TaskSchoolList).to(TaskSchoolListStore);

storeContainer.bind<ITaskSchoolItemStore>(STORE.TaskSchoolItem).to(TaskSchoolItemStore);

storeContainer.bind<IQuestionSchoolItemStore>(STORE.QuestionSchoolItem).to(QuestionSchoolItemStore);

storeContainer.bind<IQuestionSchoolListStore>(STORE.QuestionSchoolList).to(QuestionSchoolListStore);

// progress
