import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ILocaleStore from '@store/modules/common/locale/interface';

export const useLocaleStore = () => {
  const container = useContainer();
  return container.get<ILocaleStore>(STORE.Locale);
};
