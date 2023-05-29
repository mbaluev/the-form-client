import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { ITaskUserDocumentDTO } from '@model/entities/task';
import { IFileDTO } from '@model/common/file';

export interface ITaskUserDocumentViewModel
  extends IBaseCardViewModel<ITaskUserDocumentDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;
}
