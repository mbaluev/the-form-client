import { Container } from 'inversify';
import { API } from '@api/ids';
import type IAxiosApi from '@api/modules/axios/interface';
import { AxiosApi } from '@api/modules/axios';

export const apiContainer = new Container({ defaultScope: 'Singleton' });

apiContainer.bind<IAxiosApi>(API.Axios).to(AxiosApi);
