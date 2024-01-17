import type IQuestionBaseStore from '@store/modules/entities/question/base/interface';

export default interface IQuestionUserStore extends IQuestionBaseStore {
  isStart: boolean;
  isFinish: boolean;

  finish: () => Promise<void>;
  changeAnswer: (optionId: string, checked: boolean) => void;
  saveQuestionAnswers: () => Promise<void>;
  checkQuestions: () => Promise<void>;
}
