import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IModuleSchoolListStore from '@store/modules/school/module/list/interface';

export const useModuleSchoolListStore = () => {
  const container = useContainer();
  return container.get<IModuleSchoolListStore>(STORE.ModuleSchoolList);
};
