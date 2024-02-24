import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IBlockSettingsItemStore from '@store/modules/settings/block/settings/item/interface';

export const useBlockSettingsItemStore = () => {
  const container = useContainer();
  return container.get<IBlockSettingsItemStore>(STORE.BlockSettingsItem);
};
