import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IFileDTO } from '@model/file';
import { ITaskDTO } from '@model/task';

export interface ITaskViewModel extends IBaseCardViewModel<ITaskDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;
}
