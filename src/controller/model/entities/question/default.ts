import { IQuestionDTO } from '@model/entities/question/index';

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
