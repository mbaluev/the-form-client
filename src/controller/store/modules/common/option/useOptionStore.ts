import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IOptionStore from '@store/modules/common/option/interface';

export const useOptionStore = () => {
  const container = useContainer();
  return container.get<IOptionStore>(STORE.Option);
};
