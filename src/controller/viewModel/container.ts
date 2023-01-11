import { Container } from 'inversify';
import { VIEW_MODEL } from './ids';
import { AppViewModel } from '@viewModel/modules/app';
import { IAppViewModel } from '@viewModel/modules/app/interface';
import { ILocaleViewModel } from '@viewModel/modules/locale/interface';
import { LocaleViewModel } from '@viewModel/modules/locale';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { NotifyViewModel } from '@viewModel/modules/notify';
import { IMenuViewModel } from '@viewModel/modules/menu/interface';
import { MenuViewModel } from '@viewModel/modules/menu';
import { IFilterViewModel } from '@viewModel/modules/filter/interfaces';
import { FilterViewModel } from '@viewModel/modules/filter';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { ModuleViewModel } from '@viewModel/modules/module';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { BlockViewModel } from '@viewModel/modules/block';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { MaterialViewModel } from '@viewModel/modules/material';
import { IQuestionViewModel } from '@viewModel/modules/question/interface';
import { QuestionViewModel } from '@viewModel/modules/question';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { UserViewModel } from '@viewModel/modules/user';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import { AuthViewModel } from '@viewModel/modules/auth';

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

viewModelContainer.bind<IUserViewModel>(VIEW_MODEL.User).to(UserViewModel);

viewModelContainer
  .bind<IModuleViewModel>(VIEW_MODEL.Module)
  .to(ModuleViewModel);

viewModelContainer.bind<IBlockViewModel>(VIEW_MODEL.Block).to(BlockViewModel);

viewModelContainer
  .bind<IMaterialViewModel>(VIEW_MODEL.Material)
  .to(MaterialViewModel);

viewModelContainer
  .bind<IQuestionViewModel>(VIEW_MODEL.Question)
  .to(QuestionViewModel);
