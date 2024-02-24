import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMaterialSettingsListStore from '@store/modules/settings/material/settings/list/interface';

export const useMaterialSettingsListStore = () => {
  const container = useContainer();
  return container.get<IMaterialSettingsListStore>(STORE.MaterialSettingsList);
};
