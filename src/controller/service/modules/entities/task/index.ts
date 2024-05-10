import { inject, injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';
import { ITaskDTO, ITaskUserDocumentDTO, ITaskUserDTO } from '@model/entities/task';
import { API } from '@api/ids';
import type ITaskService from '@service/modules/entities/task/interface';
import type IAxiosApi from '@api/modules/axios/interface';

@injectable()
export class TaskService implements ITaskService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `/api/task`;

  getTasks = async (query?: ParsedUrlQuery): Promise<ITaskDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<ITaskDTO>>(`${this.API_PREFIX}/list`, {
      ...query,
    });
    return ret ? ret.data : undefined;
  };

  getTask = async (id?: string, query?: ParsedUrlQuery): Promise<ITaskDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<ITaskDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  saveTask = async (data: ITaskDTO) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.axiosApi.patch<IResponseItemDTO<ITaskDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.axiosApi.post<IResponseItemDTO<ITaskDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteTasks = async (ids: string[]) => {
    const ret = await this.axiosApi.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids }
    );
    return ret ? ret.success : undefined;
  };

  // user

  getTasksUser = async (query?: ParsedUrlQuery): Promise<ITaskUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getTaskUser = async (id?: string, query?: ParsedUrlQuery): Promise<ITaskUserDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  sentTaskUser = async (data: ITaskUserDocumentDTO): Promise<void> => {
    await this.axiosApi.post<IResponseItemDTO<ITaskUserDocumentDTO>>(
      `${this.API_PREFIX}/user/sent`,
      { ...data }
    );
  };

  // admin

  getTasksAdmin = async (query?: ParsedUrlQuery): Promise<ITaskUserDTO[] | undefined> => {
    const ret = await this.axiosApi.post<IResponseListDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  getTaskAdmin = async (id?: string, query?: ParsedUrlQuery): Promise<ITaskUserDTO | undefined> => {
    const ret = await this.axiosApi.get<IResponseItemDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query }
    );
    return ret ? ret.data : undefined;
  };

  sentTaskAdmin = async (data: ITaskUserDocumentDTO): Promise<void> => {
    await this.axiosApi.post<IResponseItemDTO<ITaskUserDocumentDTO>>(
      `${this.API_PREFIX}/admin/sent`,
      { ...data }
    );
  };

  completeAdmin = async (id?: string): Promise<void> => {
    await this.axiosApi.post<IResponseItemDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/admin/complete/${id}`
    );
  };
}
