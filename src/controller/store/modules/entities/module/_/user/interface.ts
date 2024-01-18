import { ParsedUrlQuery } from 'querystring';
import type IModuleBaseStore from '@store/modules/entities/module/_/base/interface';

export default interface IModuleUserStore extends IModuleBaseStore {
  getDataByBlockId: (id?: string, query?: ParsedUrlQuery) => Promise<void>;
}
