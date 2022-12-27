import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IQuestionDTO } from '@model/question';

export interface IQuestionViewModel extends IBaseCardViewModel<IQuestionDTO> {
  option?: string;
  setOption: (value?: string) => void;
  addOption: () => void;
  addOptionCorrect: (id: string) => void;
  removeOption: (id: string) => void;
  removeOptionCorrect: (id: string) => void;
}
