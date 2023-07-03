import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IQuestionUserDTO } from '@model/entities/question';

export type ITestStatusCode = 'new' | 'success' | 'fail';
export interface ITestStatus {
  code?: ITestStatusCode;
  total: number;
  complete: number;
  fail: number;
}

export interface IQuestionUserViewModel
  extends IBaseCardViewModel<IQuestionUserDTO> {
  getData: (id: string, setIndex?: boolean) => Promise<void>;

  status: ITestStatus;
  isStart: boolean;
  isNext: boolean;
  isPrev: boolean;
  isFinish: boolean;

  index?: number;

  start: () => Promise<void>;
  stop: () => Promise<void>;
  prev: () => Promise<void>;
  next: () => Promise<void>;
  finish: () => Promise<void>;

  changeAnswer: (optionId: string, checked: boolean) => void;
  saveQuestionAnswers: () => Promise<void>;
  checkQuestions: () => Promise<void>;
}
