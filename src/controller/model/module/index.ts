import { IBlockDTO } from '@model/block';

export interface IModuleDTO {
  id: string;
  title: string;
  name: string;
}

export interface IModuleUserDTO {
  id: string;
  title: string;
  name: string;
  enable: boolean;
  complete: boolean;
  blocks?: IBlockDTO[];
}
