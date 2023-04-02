export interface IOptionDTO {
  id: string;
  title: string;
}

export interface IQuestionDTO {
  id: string;
  blockId: string;
  title: string;
  position: number;
  options: IOptionDTO[];
  optionsCorrectId?: string[];
}

export interface IQuestionUserAnswerDTO {
  id: string;
  questionId: string;
  questionAnswerId: string;
  userId: string;
  correct: boolean;
}

export interface IQuestionUserDTO extends IQuestionDTO {
  answers?: IQuestionUserAnswerDTO[];
  expanded?: boolean;
}
