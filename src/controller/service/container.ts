import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import type IAuthService from '@service/modules/common/auth/interface';
import { AuthService } from '@service/modules/common/auth';
import type IUserService from '@service/modules/entities/user/interface';
import { UserService } from '@service/modules/entities/user';
import type IFileService from '@service/modules/common/file/interface';
import { FileService } from '@service/modules/common/file';
import type IOptionService from '@service/modules/common/option/interface';
import { OptionService } from '@service/modules/common/option';
import type IBlockService from '@service/modules/entities/block/interface';
import { BlockService } from '@service/modules/entities/block';
import type IMaterialService from '@service/modules/entities/material/interface';
import { MaterialService } from '@service/modules/entities/material';
import type IModuleService from '@service/modules/entities/module/interface';
import { ModuleService } from '@service/modules/entities/module';
import type IQuestionService from '@service/modules/entities/question/interface';
import { QuestionService } from '@service/modules/entities/question';
import type ITaskService from '@service/modules/entities/task/interface';
import { TaskService } from '@service/modules/entities/task';

export const serviceContainer = new Container({ defaultScope: 'Singleton' });

// common

serviceContainer.bind<IAuthService>(SERVICE.Auth).to(AuthService);

serviceContainer.bind<IFileService>(SERVICE.File).to(FileService);

serviceContainer.bind<IOptionService>(SERVICE.Option).to(OptionService);

// entities

serviceContainer.bind<IBlockService>(SERVICE.Block).to(BlockService);

serviceContainer.bind<IMaterialService>(SERVICE.Material).to(MaterialService);

serviceContainer.bind<IModuleService>(SERVICE.Module).to(ModuleService);

serviceContainer.bind<IQuestionService>(SERVICE.Question).to(QuestionService);

serviceContainer.bind<ITaskService>(SERVICE.Task).to(TaskService);

serviceContainer.bind<IUserService>(SERVICE.User).to(UserService);
