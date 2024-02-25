import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IUserSettingsListStore from '@store/modules/settings/user/list/interface';

export const useUserSettingsListStore = () => {
  const container = useContainer();
  return container.get<IUserSettingsListStore>(STORE.UserSettingsList);
};
