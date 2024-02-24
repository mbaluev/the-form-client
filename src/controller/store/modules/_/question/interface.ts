import { IQuestionDTO } from '@model/entities/question';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IQuestionStore extends IBaseCardStore<IQuestionDTO> {
  option?: string;
  setOption: (value?: string) => void;
  hasOption: boolean;

  addOption: () => void;
  removeOption: (id: string) => void;
  changeOptionCorrect: (id: string, value: boolean) => void;
}
