import { IUserDTO } from '@model/entities/user';
import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';

export type TQuestionType = 'radio' | 'checkbox';

export interface IQuestionDTO {
  id: string;
  title: string;
  position: number;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  blockId: string;
  block?: IBlockDTO;

  // references
  questionOptions?: IQuestionOptionDTO[];
  userQuestions?: IQuestionUserDTO[];

  // additional
  _type?: TQuestionType;
}
export interface IQuestionOptionDTO {
  id: string;
  title: string;
  correct: boolean;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  questionId: string;
  question?: IQuestionDTO;

  // references
  userQuestionAnswers?: IQuestionAnswerUserDTO[];
}

// user
export interface IQuestionUserDTO {
  id: string;
  complete?: boolean;
  error?: boolean;
  commentText?: string;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  questionId: string;
  question?: IQuestionDTO;
  userId: string;
  user?: IUserDTO;
  userBlockId: string;
  userBlock?: IBlockUserDTO;

  // references
  userQuestionAnswers?: IQuestionAnswerUserDTO[];
}
export interface IQuestionAnswerUserDTO {
  id?: string;
  createdAt?: string;
  updatedAt?: string;

  // foreign keys
  questionOptionId?: string;
  questionOption?: IQuestionOptionDTO;
  userId?: string;
  user?: IUserDTO;
  userQuestionId?: string;
  userQuestion?: IQuestionUserDTO;
}
