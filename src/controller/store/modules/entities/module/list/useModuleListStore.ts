import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IModuleListStore from '@store/modules/entities/module/list/interface';

export const useModuleListStore = () => {
  const container = useContainer();
  return container.get<IModuleListStore>(STORE.ModuleList);
};
