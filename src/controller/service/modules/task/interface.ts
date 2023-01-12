import { ParsedUrlQuery } from 'querystring';
import { ITaskDTO } from '@model/task';

export interface ITaskService {
  getTasks: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<ITaskDTO[] | undefined>;
  getTask: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<ITaskDTO | undefined>;
  saveTask: (
    data: ITaskDTO,
    token?: string | null
  ) => Promise<ITaskDTO | undefined>;
  deleteTasks: (
    ids: string[],
    token?: string | null
  ) => Promise<boolean | undefined>;
}
