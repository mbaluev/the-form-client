export interface IBlockDTO {
  id: string;
  moduleId: string;
  title: string;
  name: string;
}

export interface IBlockUserDTO {
  id: string;
  moduleId: string;
  title: string;
  name: string;
  enable: boolean;
  complete: boolean;
  completeMaterials: boolean;
  completeQuestions: boolean;
  completeTasks: boolean;
}
