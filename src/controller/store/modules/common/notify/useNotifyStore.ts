import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type INotifyStore from '@store/modules/common/notify/interface';

export const useNotifyStore = () => {
  const container = useContainer();
  return container.get<INotifyStore>(STORE.Notify);
};
