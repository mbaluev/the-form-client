import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IResponseListDTO } from '@model/common/response';
import { IOptionService } from '@service/modules/common/option/interface';
import { ISelectItem } from '@components/fields';

@injectable()
export class OptionService implements IOptionService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `api/documentType`;

  getDocumentTypes = async (
    token?: string | null
  ): Promise<ISelectItem[] | undefined> => {
    const ret = await this.apiModule.get<IResponseListDTO<ISelectItem>>(
      `${this.API_PREFIX}/list`,
      undefined,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };
}
