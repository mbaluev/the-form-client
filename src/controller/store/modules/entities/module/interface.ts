import { IModuleDTO } from '@model/entities/module';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IModuleStore extends IBaseCardStore<IModuleDTO> {
  moduleData?: IModuleDTO | null;
  setModuleData: (data?: IModuleDTO | null) => void;
  clearModuleData: () => Promise<void>;
}
