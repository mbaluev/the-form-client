import { IDocumentDTO } from '@model/document';

export interface ITaskDTO {
  id: string;
  blockId: string;
  document: IDocumentDTO;
  expanded?: boolean;
}
