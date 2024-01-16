import { ParsedUrlQuery } from 'querystring';
import { ITaskDTO, ITaskUserDocumentDTO, ITaskUserDTO } from '@model/entities/task';

interface ITaskService {
  getTasks: (query?: ParsedUrlQuery) => Promise<ITaskDTO[] | undefined>;
  getTask: (id?: string, query?: ParsedUrlQuery) => Promise<ITaskDTO | undefined>;
  saveTask: (data: ITaskDTO) => Promise<ITaskDTO | undefined>;
  deleteTasks: (ids: string[]) => Promise<boolean | undefined>;

  // --- user
  getTasksUser: (query?: ParsedUrlQuery) => Promise<ITaskUserDTO[] | undefined>;
  getTaskUser: (id?: string, query?: ParsedUrlQuery) => Promise<ITaskUserDTO | undefined>;
  sentTaskUser: (data: ITaskUserDocumentDTO) => Promise<void>;

  // --- admin
  getTasksAdmin: (query?: ParsedUrlQuery) => Promise<ITaskUserDTO[] | undefined>;
  getTaskAdmin: (id?: string, query?: ParsedUrlQuery) => Promise<ITaskUserDTO | undefined>;
  sentTaskAdmin: (data: ITaskUserDocumentDTO) => Promise<void>;
  completeAdmin: (id?: string) => Promise<void>;
}

export default ITaskService;
