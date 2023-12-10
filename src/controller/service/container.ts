import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import type IAuthService from '@service/modules/common/auth/interface';
import { AuthService } from '@service/modules/common/auth';

export const serviceContainer = new Container({ defaultScope: 'Singleton' });

serviceContainer.bind<IAuthService>(SERVICE.Auth).to(AuthService);
