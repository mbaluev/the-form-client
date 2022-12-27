import { IFileDTO } from '@model/file';

export type TDocumentType = 'base' | 'material' | 'task';

export interface IDocumentDTO {
  id: string;
  blockId: string;
  documentType: TDocumentType;
  name: string;
  description: string;
  file: IFileDTO;
  expanded?: boolean;
}
