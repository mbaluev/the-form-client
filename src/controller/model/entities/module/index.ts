import { IBlockUserDTO } from '@model/entities/block';

export interface IModuleDTO {
  id: string;
  title: string;
  name: string;
  position: number;
}

export interface IModuleUserDTO extends IModuleDTO {
  enable?: boolean;
  complete?: boolean;
  blocks?: IBlockUserDTO[];
}
