import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IQuestionService } from '@service/modules/entities/question/interface';
import {
  IQuestionAnswerUserDTO,
  IQuestionDTO,
  IQuestionUserDTO,
} from '@model/entities/question';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';

@injectable()
export class QuestionService implements IQuestionService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/question`;

  getQuestions = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IQuestionDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IQuestionDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getQuestion = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IQuestionDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IQuestionDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveQuestion = async (data: IQuestionDTO, token?: string | null) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<IQuestionDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<IQuestionDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteQuestions = async (ids: string[], token?: string | null) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getQuestionsUser = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IQuestionUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getQuestionUser = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IQuestionUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveQuestionAnswers = async (
    userQuestionId: string,
    userQuestionAnswers?: IQuestionAnswerUserDTO[],
    token?: string | null
  ): Promise<void> => {
    return this.apiModule.post<void>(
      `${this.API_PREFIX}/user/save`,
      { userQuestionId, userQuestionAnswers },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  checkQuestions = async (
    userBlockId: string,
    token?: string | null
  ): Promise<void> => {
    return this.apiModule.post<void>(
      `${this.API_PREFIX}/user/check`,
      { userBlockId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  // --- admin

  getQuestionsAdmin = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IQuestionUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getQuestionAdmin = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<IQuestionUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveQuestionComment = async (
    userBlockId: string,
    userQuestionId: string,
    commentText?: string,
    token?: string | null
  ): Promise<void> => {
    return this.apiModule.post<void>(
      `${this.API_PREFIX}/admin/save`,
      { userBlockId, userQuestionId, commentText },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
}
