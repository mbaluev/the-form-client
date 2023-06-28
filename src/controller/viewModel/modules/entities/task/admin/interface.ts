import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { ITaskAdminDTO } from '@model/entities/task';

export interface ITaskAdminViewModel extends IBaseCardViewModel<ITaskAdminDTO> {
  download: (id: string, filename: string) => Promise<void>;
  complete: () => Promise<void>;
}
