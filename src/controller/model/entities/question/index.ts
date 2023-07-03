export interface IQuestionOptionDTO {
  id: string;
  title: string;
  correct: boolean;
}

export interface IQuestionDTO {
  id: string;
  blockId: string;
  title: string;
  position: number;
  questionOptions: IQuestionOptionDTO[];
  questionOptionsCorrectId?: string[]; // ui validation
}

// user

export type TQuestionType = 'radio' | 'checkbox';

export interface IQuestionOptionUserDTO {
  id: string;
  title: string;
}

export interface IQuestionAnswerUserDTO {
  questionOptionId: string;
  comment?: string;
}

export interface IQuestionUserDTO {
  blockId: string;
  id: string;
  title: string;
  position: number;
  complete?: boolean;
  error?: boolean;
  questionOptions: IQuestionOptionUserDTO[];
  questionAnswers: IQuestionAnswerUserDTO[];
  type: TQuestionType;
}
