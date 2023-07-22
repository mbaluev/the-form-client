import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IMaterialUserDTO } from '@model/entities/material';

export interface IMaterialBaseViewModel
  extends IBaseCardViewModel<IMaterialUserDTO> {
  download: (id: string, filename: string) => Promise<void>;
}
