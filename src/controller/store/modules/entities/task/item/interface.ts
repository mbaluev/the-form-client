import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { ITaskDTO } from '@model/entities/task';

export default interface ITaskItemStore extends IBaseCardStore<ITaskDTO> {}
