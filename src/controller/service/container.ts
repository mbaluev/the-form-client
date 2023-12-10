import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import type IClientService from '@service/modules/client/interface';
import { ClientService } from '@service/modules/client';
import type ILanguageService from '@service/mock/languages/interface';
import { LanguageService } from '@service/mock/languages';

export const serviceContainer = new Container({ defaultScope: 'Singleton' });

serviceContainer.bind<IClientService>(SERVICE.Client).to(ClientService);

serviceContainer.bind<ILanguageService>(SERVICE.Language).to(LanguageService);
