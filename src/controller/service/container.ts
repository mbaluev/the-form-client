import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import { IModuleService } from '@service/modules/entities/module/interface';
import { ModuleService } from 'controller/service/modules/entities/module';
import { IBlockService } from '@service/modules/entities/block/interface';
import { BlockService } from 'controller/service/modules/entities/block';
import { IFileService } from '@service/modules/common/file/interface';
import { FileService } from 'controller/service/modules/common/file';
import { IQuestionService } from '@service/modules/entities/question/interface';
import { QuestionService } from 'controller/service/modules/entities/question';
import { IUserService } from '@service/modules/entities/user/interface';
import { UserService } from 'controller/service/modules/entities/user';
import { IAuthService } from '@service/modules/common/auth/interface';
import { AuthService } from 'controller/service/modules/common/auth';
import { IMaterialService } from '@service/modules/entities/material/interface';
import { MaterialService } from 'controller/service/modules/entities/material';
import { ITaskService } from '@service/modules/entities/task/interface';
import { TaskService } from 'controller/service/modules/entities/task';
import { IOptionService } from '@service/modules/common/option/interface';
import { OptionService } from 'controller/service/modules/common/option';

export const serviceContainer = new Container();

serviceContainer.bind<IAuthService>(SERVICE.Auth).to(AuthService);

serviceContainer.bind<IUserService>(SERVICE.User).to(UserService);

serviceContainer.bind<IOptionService>(SERVICE.Option).to(OptionService);

serviceContainer.bind<IFileService>(SERVICE.File).to(FileService);

serviceContainer.bind<IModuleService>(SERVICE.Module).to(ModuleService);

serviceContainer.bind<IBlockService>(SERVICE.Block).to(BlockService);

serviceContainer.bind<IMaterialService>(SERVICE.Material).to(MaterialService);

serviceContainer.bind<ITaskService>(SERVICE.Task).to(TaskService);

serviceContainer.bind<IQuestionService>(SERVICE.Question).to(QuestionService);
