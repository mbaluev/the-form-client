import { IDocumentDTO } from '@model/document';

export type TTaskStatus = 'done' | 'sent' | 'income';
export type TTaskAnswerType = 'file' | 'link';

export interface ITaskAnswerDTO {
  id: string;
  type: TTaskAnswerType;
  title: string;
}

export interface ITaskDTO {
  id: string;
  blockId: string;
  document?: IDocumentDTO;
  taskAnswers?: ITaskAnswerDTO[];
}

// user

export interface ITaskUserDTO {
  id: string;
  blockId: string;
  document?: IDocumentDTO;
  taskAnswers?: ITaskAnswerDTO[];
  status: TTaskStatus;

  expanded?: boolean; // ui accordion
}
