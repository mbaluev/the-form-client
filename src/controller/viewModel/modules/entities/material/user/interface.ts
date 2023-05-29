import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { IMaterialUserDTO } from '@model/entities/material';

export interface IMaterialUserViewModel
  extends IBaseCardViewModel<IMaterialUserDTO> {
  download: (id: string, filename: string) => Promise<void>;
  update: (id: string, complete: boolean) => Promise<boolean>;
}
