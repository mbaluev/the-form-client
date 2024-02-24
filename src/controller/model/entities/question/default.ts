import { IQuestionDTO, IQuestionOptionDTO } from '@model/entities/question/index';

export const DEFAULT_QUESTION: IQuestionDTO = {
  id: '',
  title: '',
  position: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  blockId: '',
  questionOptions: [],
  userQuestions: [],
  _type: undefined,
};

export const DEFAULT_QUESTION_OPTION: IQuestionOptionDTO = {
  id: '',
  title: '',
  correct: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  questionId: '',
  question: undefined,
  userQuestionAnswers: [],
};
