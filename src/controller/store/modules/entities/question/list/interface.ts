import type IBaseListStore from '@store/modules/base/list/interface';
import { IQuestionDTO } from '@model/entities/question';

export default interface IQuestionListStore extends IBaseListStore<IQuestionDTO> {}
