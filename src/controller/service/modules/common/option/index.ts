import { inject, injectable } from 'inversify';
import { IResponseListDTO } from '@model/common/response';
import { API } from '@api/ids';
import { ISelectItem } from '@components/fields/selectField/types';
import type IOptionService from '@service/modules/common/option/interface';
import type IAxiosApi from '@api/modules/axios/interface';

@injectable()
export class OptionService implements IOptionService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `api/documentType`;

  getDocumentTypes = async (): Promise<ISelectItem[] | undefined> => {
    const ret = await this.axiosApi.get<IResponseListDTO<ISelectItem>>(`${this.API_PREFIX}/list`);
    return ret ? ret.data : undefined;
  };
}
