import { IBlockDTO } from '@model/entities/block/index';

export const DEFAULT_BLOCK: IBlockDTO = {
  id: '',
  title: '',
  name: '',
  position: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  moduleId: '',
};
