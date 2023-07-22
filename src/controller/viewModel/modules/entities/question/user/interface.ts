import { IQuestionBaseViewModel } from '@viewModel/modules/entities/question/base/interface';

export type ITestStatusCode = 'new' | 'success' | 'fail';
export interface ITestStatus {
  code?: ITestStatusCode;
  total: number;
  complete: number;
  fail: number;
}

export interface IQuestionUserViewModel extends IQuestionBaseViewModel {
  isStart: boolean;
  isFinish: boolean;

  finish: () => Promise<void>;
  changeAnswer: (optionId: string, checked: boolean) => void;
  saveQuestionAnswers: () => Promise<void>;
  checkQuestions: () => Promise<void>;
}
