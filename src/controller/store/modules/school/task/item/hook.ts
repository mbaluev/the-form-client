import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITaskSchoolItemStore from '@store/modules/school/task/item/interface';

export const useTaskSchoolItemStore = () => {
  const container = useContainer();
  return container.get<ITaskSchoolItemStore>(STORE.TaskSchoolItem);
};
