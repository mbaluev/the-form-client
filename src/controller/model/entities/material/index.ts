import { IDocumentDTO } from 'controller/model/common/document';

export interface IMaterialDTO {
  id: string;
  blockId: string;
  documentId: string;
  document: IDocumentDTO;
  createdAt: string;
  updatedAt: string;
}

export interface IMaterialUserDTO extends IMaterialDTO {
  complete: boolean;
}
