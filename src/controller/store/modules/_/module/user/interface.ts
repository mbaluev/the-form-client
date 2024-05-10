import { ParsedUrlQuery } from 'querystring';
import type IModuleBaseStore from '@store/modules/_/module/base/interface';

export default interface IModuleUserStore extends IModuleBaseStore {
  getDataByBlockId: (id?: string, query?: ParsedUrlQuery) => Promise<void>;
}
