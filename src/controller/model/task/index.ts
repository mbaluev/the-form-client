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

export interface ITaskUserMessageDTO {
  id: string;
  document: IDocumentDTO;
  user?: {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
  };
  date?: string;
}
export interface ITaskUserDTO {
  id: string;
  blockId: string;
  document: IDocumentDTO;
  complete: boolean;
  status: TTaskStatus;
  taskAnswers: ITaskAnswerDTO[];
  expanded?: boolean; // ui accordion

  documentLatest?: ITaskUserMessageDTO;
  documentHistory?: ITaskUserMessageDTO[];
}
