import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITaskSettingsItemStore from '@store/modules/settings/task/item/interface';

export const useTaskSettingsItemStore = () => {
  const container = useContainer();
  return container.get<ITaskSettingsItemStore>(STORE.TaskSettingsItem);
};
