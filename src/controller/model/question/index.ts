export interface IOptionDTO {
  id: string;
  title: string;
}

export interface IQuestionDTO {
  id: string;
  blockId: string;
  title: string;
  options?: IOptionDTO[];
  optionsCorrectId?: string[];
}
