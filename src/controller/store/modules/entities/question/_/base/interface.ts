import { IQuestionUserDTO } from '@model/entities/question';
import { ParsedUrlQuery } from 'querystring';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export type ITestStatusCode = 'new' | 'success' | 'fail';
export interface ITestStatus {
  code?: ITestStatusCode;
  total: number;
  complete: number;
  fail: number;
}

export default interface IQuestionBaseStore extends IBaseCardStore<IQuestionUserDTO> {
  getData: (id?: string, query?: ParsedUrlQuery, setIndex?: boolean) => Promise<void>;

  status: ITestStatus;
  isNext: boolean;
  isPrev: boolean;

  index?: number;

  start: () => Promise<void>;
  stop: () => Promise<void>;
  prev: () => Promise<void>;
  next: () => Promise<void>;
}
