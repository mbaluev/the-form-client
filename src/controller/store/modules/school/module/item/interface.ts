import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { IModuleUserDTO } from '@model/entities/module';
import { ParsedUrlQuery } from 'querystring';

export default interface IModuleSchoolItemStore extends IBaseCardStore<IModuleUserDTO> {
  getDataByBlockId: (id?: string, query?: ParsedUrlQuery) => Promise<void>;
}
