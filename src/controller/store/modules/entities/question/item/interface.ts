import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { IQuestionDTO } from '@model/entities/question';

export default interface IQuestionItemStore extends IBaseCardStore<IQuestionDTO> {}
