import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { ParsedUrlQuery } from 'querystring';
import { IResponseItemDTO, IResponseListDTO } from '@model/common/response';
import { ITaskService } from '@service/modules/entities/task/interface';
import {
  ITaskDTO,
  ITaskUserDocumentDTO,
  ITaskUserDTO,
} from '@model/entities/task';

@injectable()
export class TaskService implements ITaskService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `/api/task`;

  getTasks = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<ITaskDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<ITaskDTO>>(
      `${this.API_PREFIX}/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getTask = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<ITaskDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<ITaskDTO>>(
      `${this.API_PREFIX}/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  saveTask = async (data: ITaskDTO, token?: string | null) => {
    if (data.id) {
      const { id, ...params } = data;
      const ret = await this.apiModule.patch<IResponseItemDTO<ITaskDTO>>(
        `${this.API_PREFIX}/update/${data.id}`,
        { ...params },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    } else {
      const ret = await this.apiModule.post<IResponseItemDTO<ITaskDTO>>(
        `${this.API_PREFIX}/create`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return ret ? ret.data : undefined;
    }
  };

  deleteTasks = async (ids: string[], token?: string | null) => {
    const ret = await this.apiModule.delete<IResponseItemDTO<undefined>>(
      `${this.API_PREFIX}/delete`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.success : undefined;
  };

  // user

  getTasksUser = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<ITaskUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/user/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getTaskUser = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<ITaskUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/user/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  sentTaskUser = async (
    data: ITaskUserDocumentDTO,
    token?: string | null
  ): Promise<void> => {
    await this.apiModule.post<IResponseItemDTO<ITaskUserDocumentDTO>>(
      `${this.API_PREFIX}/user/sent`,
      { ...data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  // admin

  getTasksAdmin = async (
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<ITaskUserDTO[] | undefined> => {
    const ret = await this.apiModule.post<IResponseListDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/admin/list`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  getTaskAdmin = async (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ): Promise<ITaskUserDTO | undefined> => {
    const ret = await this.apiModule.get<IResponseItemDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/admin/item/${id}`,
      { ...query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  sentTaskAdmin = async (
    data: ITaskUserDocumentDTO,
    token?: string | null
  ): Promise<void> => {
    await this.apiModule.post<IResponseItemDTO<ITaskUserDocumentDTO>>(
      `${this.API_PREFIX}/admin/sent`,
      { ...data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  completeAdmin = async (id?: string, token?: string | null): Promise<void> => {
    await this.apiModule.post<IResponseItemDTO<ITaskUserDTO>>(
      `${this.API_PREFIX}/admin/complete/${id}`,
      undefined,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
}
