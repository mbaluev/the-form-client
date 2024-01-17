import { ITaskUserDTO } from '@model/entities/task';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface ITaskBaseStore extends IBaseCardStore<ITaskUserDTO> {
  download: (id: string, filename: string) => Promise<void>;
}
