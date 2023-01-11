import { IFileDTO } from '@model/file';

export interface IDocumentDTO {
  id: string;
  name: string;
  description: string;
  file: IFileDTO;
}
