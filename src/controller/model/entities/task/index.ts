import { IDocumentDTO } from '@model/common/document';
import { IUserDTO } from '@model/entities/user';
import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';

export interface ITaskDTO {
  id: string;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  blockId: string;
  block?: IBlockDTO;
  documentId: string;
  document?: IDocumentDTO;

  // references
  userTasks?: ITaskUserDTO[];
}

export interface ITaskUserDTO {
  id: string;
  complete?: boolean;
  sent?: boolean;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  taskId: string;
  task?: ITaskDTO;
  userId: string;
  user?: IUserDTO;
  userBlockId: string;
  userBlock?: IBlockUserDTO;

  // references
  userTaskDocuments?: ITaskUserDocumentDTO[];
}
export interface ITaskUserDocumentDTO {
  id: string;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  userId: string;
  user?: IUserDTO;
  documentId: string;
  document?: IDocumentDTO;
  userTaskId: string;
  userTask?: ITaskUserDTO;
}
