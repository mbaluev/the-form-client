export interface IOptionDTO {
  id: string;
  title: string;
  correct: boolean;
}

export interface IQuestionDTO {
  id: string;
  blockId: string;
  title: string;
  position: number;
  options: IOptionDTO[];

  optionsCorrectId?: string[]; // ui validation
}

// user

export interface IOptionUserDTO {
  id: string;
  title: string;
}

export interface IQuestionUserDTO {
  blockId: string;
  id: string;
  title: string;
  position: number;
  complete?: boolean;
  options: IOptionUserDTO[];
  answers: string[];

  expanded?: boolean; // ui accordion
}

export interface IQuestionCheckDTO {
  id: string;
  answers: string[];
}
