import { IDocumentDTO } from 'controller/model/common/document';
import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';
import { IUserDTO } from '@model/entities/user';

export interface IMaterialDTO {
  id: string;
  createdAt?: string;
  updatedAt?: string;

  // foreign keys
  blockId: string;
  block?: IBlockDTO;
  documentId: string;
  document?: IDocumentDTO;

  // references
  userMaterials?: IMaterialUserDTO[];
}

// user
export interface IMaterialUserDTO {
  id: string;
  complete?: boolean;
  createdAt?: string;
  updatedAt?: string;

  // foreign keys
  materialId: string;
  material?: IMaterialDTO;
  userId: string;
  user?: IUserDTO;
  userBlockId: string;
  userBlock?: IBlockUserDTO;
}
