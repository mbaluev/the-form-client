import { IDocumentDTO } from '@model/document';

export interface IMaterialDTO {
  id: string;
  blockId: string;
  document: IDocumentDTO;
}

export interface IMaterialUserDTO extends IMaterialDTO {
  complete: boolean;
}
