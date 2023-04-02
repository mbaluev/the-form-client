import { IQuestionDTO, IQuestionUserDTO } from '@model/question';
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
}
