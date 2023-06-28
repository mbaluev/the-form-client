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
  status: ITestStatus;

  start: () => void;
  stop: () => void;
  prev: () => void;
  next: () => void;
  repeat: () => void;
  finish: () => void;

  changeAnswer: (optionId: string, checked: boolean) => void;
  saveQuestionAnswers: () => Promise<void>;
  checkQuestions: () => Promise<void>;
}
