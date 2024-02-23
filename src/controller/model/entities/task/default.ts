import { ITaskDTO } from '@model/entities/task/index';

export const DEFAULT_TASK: ITaskDTO = {
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  blockId: '',
  documentId: '',
};
