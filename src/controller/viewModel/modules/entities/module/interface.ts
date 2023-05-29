import { IModuleDTO } from '@model/entities/module';
import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';

export interface IModuleViewModel extends IBaseCardViewModel<IModuleDTO> {
  moduleData?: IModuleDTO | null;
  setModuleData: (data?: IModuleDTO | null) => void;
  clearModuleData: () => Promise<void>;
}
