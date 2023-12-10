import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import type IClientService from '@service/modules/client/interface';
import { ClientService } from '@service/modules/client';

export const serviceContainer = new Container({ defaultScope: 'Singleton' });

serviceContainer.bind<IClientService>(SERVICE.Client).to(ClientService);
