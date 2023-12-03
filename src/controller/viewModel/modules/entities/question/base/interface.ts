import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IQuestionUserDTO } from '@model/entities/question';
import { ParsedUrlQuery } from 'querystring';

export type ITestStatusCode = 'new' | 'success' | 'fail';
export interface ITestStatus {
  code?: ITestStatusCode;
  total: number;
  complete: number;
  fail: number;
}

export interface IQuestionBaseViewModel
  extends IBaseCardViewModel<IQuestionUserDTO> {
  getData: (
    id?: string,
    query?: ParsedUrlQuery,
    setIndex?: boolean
  ) => Promise<void>;

  status: ITestStatus;
  isNext: boolean;
  isPrev: boolean;

  index?: number;

  start: () => Promise<void>;
  stop: () => Promise<void>;
  prev: () => Promise<void>;
  next: () => Promise<void>;
}
