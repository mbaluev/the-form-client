import { IUserDTO } from '@model/entities/user';
import { IBlockDTO } from '@model/entities/block';

export interface IQuestionOptionDTO {
  id: string;
  title: string;
  correct: boolean;
}

export interface IQuestionDTO {
  id: string;
  blockId: string;
  block: IBlockDTO;
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
  commentText?: string;
}

export interface IQuestionUserDTO {
  blockId: string;
  id: string;
  title: string;
  position: number;
  complete?: boolean;
  error?: boolean;
  comment?: boolean;
  questionOptions: IQuestionOptionUserDTO[];
  questionAnswers: IQuestionAnswerUserDTO[];
  type: TQuestionType;
}

export interface IQuestionAdminDTO {
  id: string;
  questionId: string;
  question: IQuestionDTO;
  userId: string;
  user: IUserDTO;
  complete?: boolean;
  error?: boolean;
  comment?: boolean;
  questionOptions?: IQuestionOptionUserDTO[];
  questionAnswers?: IQuestionAnswerUserDTO[];
  type?: TQuestionType;
}
