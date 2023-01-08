import { IModuleDTO, IModuleUserDTO } from '@model/module/index';

export const MODULES: IModuleDTO[] = [
  {
    id: '1',
    title: 'Introduction Module',
    name: 'About Business Analysis',
  },
  {
    id: '2',
    title: 'Module 1',
    name: 'Start Your Product',
  },
  {
    id: '3',
    title: 'Module 2',
    name: 'Module 2',
  },
];

export const MODULES_USER: IModuleUserDTO[] = [...MODULES].map((module) => {
  return {
    ...module,
    enable: true,
    complete: true,
  };
});
