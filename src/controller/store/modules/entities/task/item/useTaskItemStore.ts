import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITaskItemStore from '@store/modules/entities/task/item/interface';

export const useTaskItemStore = () => {
  const container = useContainer();
  return container.get<ITaskItemStore>(STORE.TaskItem);
};
