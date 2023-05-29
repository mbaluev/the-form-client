import { IDocumentDTO } from '@model/common/document';

export interface ITaskDTO {
  id: string;
  blockId: string;
  documentId: string;
  document: IDocumentDTO;
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
  createdAt: string;
  updatedAt: string;
}
