import { IModuleDTO, IModuleUserDTO } from '@model/entities/module/index';

export const DEFAULT_MODULE: IModuleDTO = {
  id: '',
  title: '',
  name: '',
  position: 0,
};

export const DEFAULT_MODULE_USER: IModuleUserDTO = {
  id: '',
  enable: false,
  complete: false,
  createdAt: undefined,
  updatedAt: undefined,

  // foreign keys
  moduleId: '',
  module: undefined,
  userId: '',
  user: undefined,

  // references
  userBlocks: undefined,
};
