import { IQuestionAnswerUserDTO, IQuestionDTO, IQuestionUserDTO } from '@model/entities/question';
import { ParsedUrlQuery } from 'querystring';

export interface IQuestionService {
  getQuestions: (query?: ParsedUrlQuery) => Promise<IQuestionDTO[] | undefined>;
  getQuestion: (id?: string, query?: ParsedUrlQuery) => Promise<IQuestionDTO | undefined>;
  saveQuestion: (data: IQuestionDTO) => Promise<IQuestionDTO | undefined>;
  deleteQuestions: (ids: string[]) => Promise<boolean | undefined>;

  // --- user
  getQuestionsUser: (query?: ParsedUrlQuery) => Promise<IQuestionUserDTO[] | undefined>;
  getQuestionUser: (id?: string, query?: ParsedUrlQuery) => Promise<IQuestionUserDTO | undefined>;
  saveQuestionAnswers: (
    userQuestionId: string,
    userQuestionAnswers?: IQuestionAnswerUserDTO[]
  ) => Promise<void>;
  checkQuestions: (userBlockId: string, token?: string | null) => Promise<void>;

  // --- admin
  getQuestionsAdmin: (query?: ParsedUrlQuery) => Promise<IQuestionUserDTO[] | undefined>;
  getQuestionAdmin: (id?: string, query?: ParsedUrlQuery) => Promise<IQuestionUserDTO | undefined>;
  saveQuestionComment: (
    userBlockId: string,
    userQuestionId: string,
    comment?: string
  ) => Promise<void>;
}
