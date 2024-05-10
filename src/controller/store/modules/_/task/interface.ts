import { ITaskDTO } from '@model/entities/task';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface ITaskStore extends IBaseCardStore<ITaskDTO> {}
