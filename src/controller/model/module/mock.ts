import { IModuleDTO } from '@model/module/index';

export const MODULES: IModuleDTO[] = [
  {
    id: '1',
    title: 'Introduction Module',
    name: 'About Business Analysis',
    complete: true,
    enable: true,
  },
  {
    id: '2',
    title: 'Module 1',
    name: 'Start Your Product',
    complete: false,
    enable: true,
  },
  {
    id: '3',
    title: 'Module 2',
    name: 'Module 2',
    complete: false,
    enable: false,
  },
];
