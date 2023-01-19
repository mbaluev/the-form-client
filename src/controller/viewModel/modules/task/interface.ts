import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IFileDTO } from '@model/file';
import { ITaskDTO, TTaskAnswerType } from '@model/task';

export interface ITaskViewModel extends IBaseCardViewModel<ITaskDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;

  type?: TTaskAnswerType;
  title?: string;
  setType: (value?: TTaskAnswerType) => void;
  setTitle: (value?: string) => void;

  addAnswer: () => void;
  removeAnswer: (id: string) => void;
}
