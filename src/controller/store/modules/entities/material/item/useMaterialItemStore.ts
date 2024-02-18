import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMaterialItemStore from '@store/modules/entities/material/item/interface';

export const useMaterialItemStore = () => {
  const container = useContainer();
  return container.get<IMaterialItemStore>(STORE.MaterialItem);
};
