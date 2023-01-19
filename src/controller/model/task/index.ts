import { IDocumentDTO } from '@model/document';

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
