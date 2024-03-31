import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMaterialSchoolItemStore from '@store/modules/school/material/item/interface';

export const useMaterialSchoolItemStore = () => {
  const container = useContainer();
  return container.get<IMaterialSchoolItemStore>(STORE.MaterialSchoolItem);
};
