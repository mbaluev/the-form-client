import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IModuleSettingsListStore from '@store/modules/settings/module/settings/list/interface';

export const useModuleSettingsListStore = () => {
  const container = useContainer();
  return container.get<IModuleSettingsListStore>(STORE.ModuleSettingsList);
};
