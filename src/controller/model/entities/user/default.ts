import { IUserDTO } from '@model/entities/user/index';

export const DEFAULT_USER: IUserDTO = {
  id: '',
  firstname: '',
  lastname: '',
  username: '',
  password: null,
  salt: null,
  active: null,
  paid: null,
  admin: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
