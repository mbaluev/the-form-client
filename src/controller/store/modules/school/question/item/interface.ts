import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { IQuestionUserDTO } from '@model/entities/question';

export default interface IQuestionSchoolItemStore extends IBaseCardStore<IQuestionUserDTO> {}
