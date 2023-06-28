import { ParsedUrlQuery } from 'querystring';
import {
  ITaskAdminDTO,
  ITaskDTO,
  ITaskUserDocumentDTO,
  ITaskUserDTO,
} from '@model/entities/task';

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

  getTasksUser: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<ITaskUserDTO[] | undefined>;
  getTaskUser: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<ITaskUserDTO | undefined>;
  sentTaskUser: (
    data: ITaskUserDocumentDTO,
    token?: string | null
  ) => Promise<ITaskUserDocumentDTO | undefined>;

  getTasksAdmin: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<ITaskAdminDTO[] | undefined>;
  getTaskAdmin: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<ITaskAdminDTO | undefined>;
  completeAdmin: (
    id?: string,
    token?: string | null
  ) => Promise<ITaskAdminDTO | undefined>;
}
