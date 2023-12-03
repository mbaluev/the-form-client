import { IModuleBaseViewModel } from '@viewModel/modules/entities/module/base/interface';
import { ParsedUrlQuery } from 'querystring';

export interface IModuleUserViewModel extends IModuleBaseViewModel {
  getDataByBlockId: (id?: string, query?: ParsedUrlQuery) => Promise<void>;
}
