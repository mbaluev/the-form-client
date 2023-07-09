import {
  IQuestionAdminDTO,
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
    questionId: string,
    questionAnswers: string[],
    token?: string | null
  ) => Promise<void>;
  checkQuestions: (blockId: string, token?: string | null) => Promise<void>;

  // --- admin
  getQuestionsAdmin: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionAdminDTO[] | undefined>;
  getQuestionAdmin: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IQuestionAdminDTO | undefined>;
}
