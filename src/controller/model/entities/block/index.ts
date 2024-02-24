import { IModuleDTO, IModuleUserDTO } from '@model/entities/module';
import { IUserDTO } from '@model/entities/user';
import { IMaterialUserDTO } from '@model/entities/material';
import { ITaskUserDTO } from '@model/entities/task';
import { IQuestionUserDTO } from '@model/entities/question';

export interface IBlockDTO {
  id: string;
  title: string;
  name: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;

  // foreign keys
  moduleId: string;
  module?: IModuleDTO;
}

// user
export interface IBlockUserDTO {
  id: string;
  enable: boolean;
  complete: boolean;
  completeMaterials: boolean;
  completeQuestions: boolean;
  completeTasks: boolean;
  errorQuestions: boolean;
  commentQuestions: boolean;
  sentTasksUser?: boolean;
  sentTasksAdmin?: boolean;
  createdAt: string;
  updatedAt: string;

  // foreign keys
  blockId: string;
  block?: IBlockDTO;
  userId: string;
  user?: IUserDTO;
  userModuleId: string;
  userModule?: IModuleUserDTO;

  // references
  userMaterials?: IMaterialUserDTO[];
  userTasks?: ITaskUserDTO[];
  userQuestions?: IQuestionUserDTO[];
}
