import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITaskSettingsListStore from '@store/modules/settings/task/settings/list/interface';

export const useTaskSettingsListStore = () => {
  const container = useContainer();
  return container.get<ITaskSettingsListStore>(STORE.TaskSettingsList);
};
