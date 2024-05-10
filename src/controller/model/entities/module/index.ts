import { IBlockDTO, IBlockUserDTO } from '@model/entities/block';
import { IUserDTO } from '@model/entities/user';

export interface IModuleDTO {
  id: string;
  title: string;
  name: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;

  // references
  blocks?: IBlockDTO[];
  userModules?: IModuleUserDTO[];
}

// user
export interface IModuleUserDTO {
  id: string;
  enable: boolean;
  complete: boolean;
  createdAt?: string;
  updatedAt?: string;

  // foreign keys
  moduleId: string;
  module?: IModuleDTO;
  userId: string;
  user?: IUserDTO;

  // references
  userBlocks?: IBlockUserDTO[];
}
