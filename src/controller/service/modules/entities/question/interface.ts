import {
  IQuestionAnswerUserDTO,
  IQuestionDTO,
  IQuestionUserDTO,
} from '@model/entities/question';
import { ParsedUrlQuery } from 'querystring';

export interface IQuestionService {
  getQuestions: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionDTO[] | undefined>;
  getQuestion: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionDTO | undefined>;
  saveQuestion: (
    data: IQuestionDTO,
    token?: string | null
  ) => Promise<IQuestionDTO | undefined>;
  deleteQuestions: (
    ids: string[],
    token?: string | null
  ) => Promise<boolean | undefined>;

  // --- user
  getQuestionsUser: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionUserDTO[] | undefined>;
  getQuestionUser: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionUserDTO | undefined>;
  saveQuestionAnswers: (
    userQuestionId: string,
    userQuestionAnswers?: IQuestionAnswerUserDTO[],
    token?: string | null
  ) => Promise<void>;
  checkQuestions: (userBlockId: string, token?: string | null) => Promise<void>;

  // --- admin
  getQuestionsAdmin: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionUserDTO[] | undefined>;
  getQuestionAdmin: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionUserDTO | undefined>;
}
