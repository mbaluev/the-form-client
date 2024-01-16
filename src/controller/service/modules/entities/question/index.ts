import { inject, injectable } from 'inversify';
import { IQuestionAnswerUserDTO, IQuestionDTO, IQuestionUserDTO } from '@model/entities/question';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';
import { API } from '@api/ids';
import type IQuestionService from '@service/modules/entities/question/interface';
import type IAxiosApi from '@api/modules/axios/interface';

@injectable()
export class QuestionService implements IQuestionService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `/api/question`;

  getQuestions = async (query?: ParsedUrlQuery): Promise<IQuestionDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IQuestionDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getQuestion = async (id?: string, query?: ParsedUrlQuery): Promise<IQuestionDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<IQuestionDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveQuestion = async (data: IQuestionDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.axiosApi.patch<IResponseItemDTO<IQuestionDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.axiosApi.post<IResponseItemDTO<IQuestionDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteQuestions = async (ids: string[]) => {
    const ret = await this.axiosApi.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // --- user

  getQuestionsUser = async (query?: ParsedUrlQuery): Promise<IQuestionUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getQuestionUser = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IQuestionUserDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveQuestionAnswers = async (
    userQuestionId: string,
    userQuestionAnswers?: IQuestionAnswerUserDTO[]
  ): Promise<void> => {
    return this.axiosApi.post<void>(`${this.API_PREFIX}/user/save`, {
      userQuestionId,
      userQuestionAnswers,
    });
  };

  checkQuestions = async (userBlockId: string): Promise<void> => {
    return this.axiosApi.post<void>(`${this.API_PREFIX}/user/check`, {
      userBlockId,
    });
  };

  // --- admin

  getQuestionsAdmin = async (query?: ParsedUrlQuery): Promise<IQuestionUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getQuestionAdmin = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IQuestionUserDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<IQuestionUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveQuestionComment = async (
    userBlockId: string,
    userQuestionId: string,
    commentText?: string
  ): Promise<void> => {
    return this.axiosApi.post<void>(`${this.API_PREFIX}/admin/save`, {
      userBlockId,
      userQuestionId,
      commentText,
    });
  };
}
