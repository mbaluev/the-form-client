import { IModuleDTO } from '@model/module';
import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';

export interface IModuleViewModel extends IBaseCardViewModel<IModuleDTO> {
  moduleData?: IModuleDTO | null;
  setModuleData: (data?: IModuleDTO | null) => void;
  clearModuleData: () => Promise<void>;
}
