import { IDocumentDTO } from '@model/common/document';
import { IUserDTO } from '@model/entities/user';
import { IBlockDTO } from '@model/entities/block';

export interface ITaskDTO {
  id: string;
  blockId: string;
  block: IBlockDTO;
  documentId: string;
  document: IDocumentDTO;
  userTaskDocuments: ITaskUserDocumentDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface ITaskUserDTO extends ITaskDTO {
  complete: boolean;
  sent: boolean;
}

export interface ITaskUserDocumentDTO {
  id: string;
  taskId: string;
  documentId: string;
  document: IDocumentDTO;
  userId: string;
  user: IUserDTO;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskAdminDTO {
  id: string;
  taskId: string;
  task: ITaskDTO;
  userId: string;
  user: IUserDTO;
  complete: boolean;
  userTaskDocuments: ITaskUserDocumentDTO[];
  sent?: boolean; // ui validation
}
