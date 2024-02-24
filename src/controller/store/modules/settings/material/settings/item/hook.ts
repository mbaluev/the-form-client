import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMaterialSettingsItemStore from '@store/modules/settings/material/settings/item/interface';

export const useMaterialSettingsItemStore = () => {
  const container = useContainer();
  return container.get<IMaterialSettingsItemStore>(STORE.MaterialSettingsItem);
};
