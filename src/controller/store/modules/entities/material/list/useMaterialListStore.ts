import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMaterialListStore from '@store/modules/entities/material/list/interface';

export const useMaterialListStore = () => {
  const container = useContainer();
  return container.get<IMaterialListStore>(STORE.MaterialList);
};
