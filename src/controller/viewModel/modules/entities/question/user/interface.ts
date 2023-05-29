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
  play: boolean;
  prev: () => void;
  next: () => void;
  repeat: () => void;
  finish: () => void;
  expand: (index: number) => void;

  changeAnswer: (
    questionId: string,
    optionId: string,
    checked: boolean
  ) => void;
}
