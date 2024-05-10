import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IBlockSettingsListStore from '@store/modules/settings/block/list/interface';

export const useBlockSettingsListStore = () => {
  const container = useContainer();
  return container.get<IBlockSettingsListStore>(STORE.BlockSettingsList);
};
