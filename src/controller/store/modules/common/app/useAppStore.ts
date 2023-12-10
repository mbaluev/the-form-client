import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IAppStore from '@store/modules/common/app/interface';

export const useAppStore = () => {
  const container = useContainer();
  return container.get<IAppStore>(STORE.App);
};
