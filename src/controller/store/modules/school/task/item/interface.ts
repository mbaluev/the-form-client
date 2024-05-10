import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { ITaskUserDTO } from '@model/entities/task';

export default interface ITaskSchoolItemStore extends IBaseCardStore<ITaskUserDTO> {}
