import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IFileDTO } from '@model/file';
import { IMaterialDTO } from '@model/material';

export interface IMaterialViewModel extends IBaseCardViewModel<IMaterialDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;
}
