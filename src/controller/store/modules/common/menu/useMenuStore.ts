import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IMenuStore from '@store/modules/common/menu/interface';

export const useMenuStore = () => {
  const container = useContainer();
  return container.get<IMenuStore>(STORE.Menu);
};
