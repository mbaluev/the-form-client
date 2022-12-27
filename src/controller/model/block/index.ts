import { ITabItemProps } from '@components/tab';

export interface IBlockTabDTO extends ITabItemProps {
  complete: boolean;
}

export interface IBlockDTO {
  id: string;
  moduleId: string;
  title: string;
  name: string;
  complete: boolean;
  enable: boolean;
  tabs: IBlockTabDTO[];
}
