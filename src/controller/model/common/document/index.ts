import { IFileDTO } from '@model/common/file';
import { IUserDTO } from '@model/entities/user';

export type TDocumentType = 'file' | 'link' | 'video';

export interface IDocumentDTO {
  id: string;
  documentTypeId: TDocumentType;
  documentType: IDocumentTypeDTO;
  name: string;
  description: string;
  fileId: string;
  file: IFileDTO;
  url: string;
  userId: string;
  user: IUserDTO;
  createdAt: string;
  updatedAt: string;
}
export interface IDocumentTypeDTO {
  id: string;
  name: string;
}
