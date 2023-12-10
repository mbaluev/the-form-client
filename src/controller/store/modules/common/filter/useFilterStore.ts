import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IFilterStore from '@store/modules/common/filter/interfaces';

export const useFilterStore = () => {
  const container = useContainer();
  return container.get<IFilterStore>(STORE.Filter);
};
