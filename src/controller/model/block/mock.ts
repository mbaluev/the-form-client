import { IBlockDTO, IBlockUserDTO } from '@model/block/index';

export const BLOCKS: IBlockDTO[] = [
  {
    id: '1',
    moduleId: '1',
    title: 'Lecture 1',
    name: 'What is Business Analysis and who is the BA?',
    position: 1,
  },
  {
    id: '2',
    moduleId: '1',
    title: 'Lecture 2',
    name: 'What is a Product?',
    position: 2,
  },
  {
    id: '3',
    moduleId: '1',
    title: 'Lecture 3',
    name: 'Product Architecture',
    position: 3,
  },
  {
    id: '4',
    moduleId: '2',
    title: 'Lecture 1',
    name: 'Analytics in Product Strategy',
    position: 1,
  },
  {
    id: '5',
    moduleId: '2',
    title: 'Lecture 2',
    name: 'Module 1 - Lecture 2',
    position: 2,
  },
  {
    id: '6',
    moduleId: '2',
    title: 'Lecture 3',
    name: 'Module 1 - Lecture 3',
    position: 3,
  },
  {
    id: '7',
    moduleId: '3',
    title: 'Lecture 1',
    name: 'Module 2 - Lecture 1',
    position: 1,
  },
];

export const BLOCKS_USER: IBlockUserDTO[] = [...BLOCKS].map((block) => {
  return {
    ...block,
    enable: true,
    complete: true,
    completeMaterials: true,
    completeQuestions: true,
    completeTasks: true,
  };
});
