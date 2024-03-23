import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMaterialSchoolListStore from '@store/modules/school/material/list/interface';

export const useMaterialSchoolListStore = () => {
  const container = useContainer();
  return container.get<IMaterialSchoolListStore>(STORE.MaterialSchoolList);
};
