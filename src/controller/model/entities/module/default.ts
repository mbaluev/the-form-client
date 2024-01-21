import { IModuleDTO } from '@model/entities/module/index';

export const DEFAULT_MODULE: IModuleDTO = {
  id: '',
  title: '',
  name: '',
  position: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
