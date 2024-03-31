import type IBaseListStore from '@store/modules/base/list/interface';
import { ITaskUserDTO } from '@model/entities/task';

export default interface ITaskSchoolListStore extends IBaseListStore<ITaskUserDTO> {}
