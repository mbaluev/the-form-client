import { IModuleUserDTO } from '@model/module';
import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';

export interface IModuleViewModel extends IBaseCardViewModel<IModuleUserDTO> {
  moduleData?: IModuleUserDTO | null;
  setModuleData: (data?: IModuleUserDTO | null) => void;
  clearModuleData: () => Promise<void>;
}
