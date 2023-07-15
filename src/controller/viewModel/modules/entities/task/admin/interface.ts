import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { ITaskUserDTO } from '@model/entities/task';

export interface ITaskAdminViewModel extends IBaseCardViewModel<ITaskUserDTO> {
  download: (id: string, filename: string) => Promise<void>;
  complete: () => Promise<void>;
}
