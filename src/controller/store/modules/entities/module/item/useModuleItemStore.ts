import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IModuleItemStore from '@store/modules/entities/module/item/interface';

export const useModuleItemStore = () => {
  const container = useContainer();
  return container.get<IModuleItemStore>(STORE.ModuleItem);
};
