import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IUserSettingsItemStore from '@store/modules/settings/user/settings/item/interface';

export const useUserSettingsItemStore = () => {
  const container = useContainer();
  return container.get<IUserSettingsItemStore>(STORE.UserSettingsItem);
};
