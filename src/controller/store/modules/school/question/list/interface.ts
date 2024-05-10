import type IBaseListStore from '@store/modules/base/list/interface';
import { IQuestionUserDTO } from '@model/entities/question';

export default interface IQuestionSchoolListStore extends IBaseListStore<IQuestionUserDTO> {}
