import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IModuleSettingsItemStore from '@store/modules/settings/module/settings/item/interface';

export const useModuleSettingsItemStore = () => {
  const container = useContainer();
  return container.get<IModuleSettingsItemStore>(STORE.ModuleSettingsItem);
};
