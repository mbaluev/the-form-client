import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IModuleSchoolItemStore from '@store/modules/school/module/item/interface';

export const useModuleSchoolItemStore = () => {
  const container = useContainer();
  return container.get<IModuleSchoolItemStore>(STORE.ModuleSchoolItem);
};
