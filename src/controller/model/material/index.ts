import { IDocumentDTO } from '@model/document';

export interface IMaterialDTO {
  id: string;
  blockId: string;
  document: IDocumentDTO;
  expanded?: boolean;
}
