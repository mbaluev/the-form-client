import { IBlockDTO } from '@model/block';

export interface IModuleDTO {
  id: string;
  title: string;
  name: string;
}

export interface IModuleUserDTO extends IModuleDTO {
  enable: boolean;
  complete: boolean;
  blocks?: IBlockDTO[];
}
