import { Container } from 'inversify';
import { INFRASTRUCTURE_MODULE } from './ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { AxiosApiModule } from '@infrastructure/modules/axios';
import { IFileApiModule } from '@infrastructure/modules/file/interface';
import { FileApiModule } from '@infrastructure/modules/file';
import { IFetchApiModule } from '@infrastructure/modules/fetch/interface';
import { FetchApiModule } from '@infrastructure/modules/fetch';

export const infrastructureContainer = new Container();

infrastructureContainer.bind<IAxiosApiModule>(INFRASTRUCTURE_MODULE.Axios).to(AxiosApiModule);

infrastructureContainer.bind<IFileApiModule>(INFRASTRUCTURE_MODULE.File).to(FileApiModule);

infrastructureContainer.bind<IFetchApiModule>(INFRASTRUCTURE_MODULE.Fetch).to(FetchApiModule);
