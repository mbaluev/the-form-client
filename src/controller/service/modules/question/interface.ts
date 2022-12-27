import { IQuestionDTO } from '@model/question';
import { ParsedUrlQuery } from 'querystring';

export interface IQuestionService {
  getQuestions: (
    blockId?: string,
    query?: ParsedUrlQuery
  ) => Promise<IQuestionDTO[] | undefined>;
  getQuestion: (id?: string) => Promise<IQuestionDTO | undefined>;
  saveQuestion: (data: IQuestionDTO) => Promise<IQuestionDTO>;
  deleteQuestions: (ids: string[]) => Promise<boolean>;
}
