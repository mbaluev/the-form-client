import { IQuestionDTO, IQuestionOptionDTO } from '@model/entities/question/index';

export const DEFAULT_QUESTION: IQuestionDTO = {
  id: '',
  title: '',
  position: 1,
  blockId: '',
  questionOptions: [],
  userQuestions: [],
  _type: undefined,
};

export const DEFAULT_QUESTION_OPTION: IQuestionOptionDTO = {
  id: '',
  title: '',
  correct: false,
  questionId: '',
  question: undefined,
  userQuestionAnswers: [],
};
