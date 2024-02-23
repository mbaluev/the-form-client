import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITaskListStore from '@store/modules/entities/task/list/interface';

export const useTaskListStore = () => {
  const container = useContainer();
  return container.get<ITaskListStore>(STORE.TaskList);
};
