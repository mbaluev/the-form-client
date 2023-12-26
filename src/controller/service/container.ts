import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import type IAuthService from '@service/modules/common/auth/interface';
import { AuthService } from '@service/modules/common/auth';
import type IUserService from '@service/modules/entities/user/interface';
import { UserService } from '@service/modules/entities/user';

export const serviceContainer = new Container({ defaultScope: 'Singleton' });

serviceContainer.bind<IAuthService>(SERVICE.Auth).to(AuthService);

serviceContainer.bind<IUserService>(SERVICE.User).to(UserService);
