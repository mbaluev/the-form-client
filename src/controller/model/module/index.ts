import { IBlockDTO } from '@model/block';

export interface IModuleDTO {
  id: string;
  title: string;
  name: string;
  complete: boolean;
  enable: boolean;
  blocks?: IBlockDTO[];
}
