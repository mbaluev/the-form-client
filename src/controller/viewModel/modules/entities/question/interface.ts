import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IQuestionDTO } from '@model/entities/question';

export interface IQuestionViewModel extends IBaseCardViewModel<IQuestionDTO> {
  option?: string;
  setOption: (value?: string) => void;
  hasOption: boolean;

  addOption: () => void;
  removeOption: (id: string) => void;
  changeOptionCorrect: (id: string, value: boolean) => void;
}
