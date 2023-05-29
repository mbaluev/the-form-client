import { Container } from 'inversify';
import { VIEW_MODEL } from './ids';
import { AppViewModel } from 'controller/viewModel/modules/common/app';
import { IAppViewModel } from '@viewModel/modules/common/app/interface';
import { ILocaleViewModel } from '@viewModel/modules/common/locale/interface';
import { LocaleViewModel } from 'controller/viewModel/modules/common/locale';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { NotifyViewModel } from 'controller/viewModel/modules/common/notify';
import { IMenuViewModel } from '@viewModel/modules/common/menu/interface';
import { MenuViewModel } from 'controller/viewModel/modules/common/menu';
import { IFilterViewModel } from '@viewModel/modules/common/filter/interfaces';
import { FilterViewModel } from 'controller/viewModel/modules/common/filter';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { ModuleViewModel } from 'controller/viewModel/modules/entities/module';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { BlockViewModel } from 'controller/viewModel/modules/entities/block';
import { IMaterialViewModel } from '@viewModel/modules/entities/material/interface';
import { MaterialViewModel } from 'controller/viewModel/modules/entities/material';
import { IQuestionViewModel } from '@viewModel/modules/entities/question/interface';
import { QuestionViewModel } from 'controller/viewModel/modules/entities/question';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { UserViewModel } from 'controller/viewModel/modules/entities/user';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { AuthViewModel } from 'controller/viewModel/modules/common/auth';
import { ITaskViewModel } from '@viewModel/modules/entities/task/interface';
import { TaskViewModel } from 'controller/viewModel/modules/entities/task';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { ModuleUserViewModel } from '@viewModel/modules/entities/module/user';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { MaterialUserViewModel } from '@viewModel/modules/entities/material/user';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { QuestionUserViewModel } from '@viewModel/modules/entities/question/user';
import { IOptionViewModel } from '@viewModel/modules/common/option/interface';
import { OptionViewModel } from 'controller/viewModel/modules/common/option';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { TaskUserViewModel } from '@viewModel/modules/entities/task/user';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';
import { TaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument';

export const viewModelContainer = new Container({ defaultScope: 'Singleton' });

viewModelContainer.bind<IAppViewModel>(VIEW_MODEL.App).to(AppViewModel);

viewModelContainer.bind<IAuthViewModel>(VIEW_MODEL.Auth).to(AuthViewModel);

viewModelContainer.bind<IMenuViewModel>(VIEW_MODEL.Menu).to(MenuViewModel);

viewModelContainer
  .bind<INotifyViewModel>(VIEW_MODEL.Notify)
  .to(NotifyViewModel);

viewModelContainer
  .bind<ILocaleViewModel>(VIEW_MODEL.Locale)
  .to(LocaleViewModel);

viewModelContainer
  .bind<IFilterViewModel>(VIEW_MODEL.Filter)
  .to(FilterViewModel);

viewModelContainer
  .bind<IOptionViewModel>(VIEW_MODEL.Option)
  .to(OptionViewModel);

viewModelContainer.bind<IUserViewModel>(VIEW_MODEL.User).to(UserViewModel);

viewModelContainer
  .bind<IModuleViewModel>(VIEW_MODEL.Module)
  .to(ModuleViewModel);

viewModelContainer.bind<IBlockViewModel>(VIEW_MODEL.Block).to(BlockViewModel);

viewModelContainer
  .bind<IMaterialViewModel>(VIEW_MODEL.Material)
  .to(MaterialViewModel);

viewModelContainer.bind<ITaskViewModel>(VIEW_MODEL.Task).to(TaskViewModel);

viewModelContainer
  .bind<IQuestionViewModel>(VIEW_MODEL.Question)
  .to(QuestionViewModel);

viewModelContainer
  .bind<IModuleUserViewModel>(VIEW_MODEL.ModuleUser)
  .to(ModuleUserViewModel);

viewModelContainer
  .bind<IBlockUserViewModel>(VIEW_MODEL.BlockUser)
  .to(BlockUserViewModel);

viewModelContainer
  .bind<IMaterialUserViewModel>(VIEW_MODEL.MaterialUser)
  .to(MaterialUserViewModel);

viewModelContainer
  .bind<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser)
  .to(QuestionUserViewModel);

viewModelContainer
  .bind<ITaskUserViewModel>(VIEW_MODEL.TaskUser)
  .to(TaskUserViewModel);

viewModelContainer
  .bind<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument)
  .to(TaskUserDocumentViewModel);
