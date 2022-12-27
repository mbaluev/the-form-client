import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { guid } from '@utils/guid/guid';
import { IQuestionService } from '@service/modules/question/interface';
import { IQuestionDTO } from '@model/question';
import { ParsedUrlQuery } from 'querystring';
import { MOCK_QUESTIONS } from '@model/question/mock';

@injectable()
export class QuestionService implements IQuestionService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  mockFilterByQuery =
    (query?: ParsedUrlQuery) =>
    (question: IQuestionDTO): boolean => {
      return query
        ? query.search
          ? question.title
              .toLowerCase()
              .includes((query.search as string).toLowerCase())
          : true
        : true;
    };

  getQuestions = async (
    blockId?: string,
    query?: ParsedUrlQuery
  ): Promise<IQuestionDTO[] | undefined> => {
    const questions = MOCK_QUESTIONS.filter(
      (d) => d.blockId === blockId
    ).filter(this.mockFilterByQuery(query));
    return new Promise<IQuestionDTO[] | undefined>((resolve) => {
      setTimeout(() => resolve(questions), 1000);
    });
  };

  getQuestion = async (id?: string): Promise<IQuestionDTO | undefined> => {
    const question = MOCK_QUESTIONS.find((d) => d.id === id);
    return new Promise<IQuestionDTO | undefined>((resolve) => {
      setTimeout(() => resolve(question), 1000);
    });
  };

  saveQuestion = async (data: IQuestionDTO) => {
    if (!data.id) data.id = guid();
    return new Promise<IQuestionDTO>((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  deleteQuestions = async (ids: string[]) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
}
