import type IBaseListStore from '@store/modules/base/list/interface';
import { ITaskDTO } from '@model/entities/task';

export default interface ITaskSettingsListStore extends IBaseListStore<ITaskDTO> {}
