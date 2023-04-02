import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IMaterialUserDTO } from '@model/material';

export interface IMaterialUserViewModel
  extends IBaseCardViewModel<IMaterialUserDTO> {
  download: (
    id: string,
    filename: string,
    materialId: string,
    blockId: string
  ) => Promise<boolean>;
}
