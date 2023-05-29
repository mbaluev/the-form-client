import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IFileDTO } from 'controller/model/common/file';
import { IMaterialDTO } from '@model/entities/material';

export interface IMaterialViewModel extends IBaseCardViewModel<IMaterialDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;
}
