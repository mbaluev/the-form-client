import { IDocumentDTO } from '@model/common/document';
import { IModuleUserDTO } from '@model/entities/module';
import { IBlockUserDTO } from '@model/entities/block';
import { IMaterialUserDTO } from '@model/entities/material';
import { ITaskUserDocumentDTO, ITaskUserDTO } from '@model/entities/task';
import { IQuestionAnswerUserDTO, IQuestionUserDTO } from '@model/entities/question';

export interface IUserDTO {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  salt?: string;
  active?: boolean;
  paid?: boolean;
  admin?: boolean;
  createdAt: string;
  updatedAt: string;

  // references
  userDocuments?: IDocumentDTO[];
  userModules?: IModuleUserDTO[];
  userBlocks?: IBlockUserDTO[];
  userMaterials?: IMaterialUserDTO[];
  userTasks?: ITaskUserDTO[];
  userTaskDocuments?: ITaskUserDocumentDTO[];
  userQuestions?: IQuestionUserDTO[];
  userQuestionAnswers?: IQuestionAnswerUserDTO[];
}
