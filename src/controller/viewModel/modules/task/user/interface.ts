import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { ITaskUserDTO } from '@model/task';

export interface ITaskUserViewModel extends IBaseCardViewModel<ITaskUserDTO> {
  download: (id: string, filename: string) => Promise<void>;
}
