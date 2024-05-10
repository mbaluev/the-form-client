import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITaskSchoolListStore from '@store/modules/school/task/list/interface';

export const useTaskSchoolListStore = () => {
  const container = useContainer();
  return container.get<ITaskSchoolListStore>(STORE.TaskSchoolList);
};
