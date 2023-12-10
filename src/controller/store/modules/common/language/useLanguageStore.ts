import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ILanguageStore from '@store/modules/common/language/interface';

export const useLanguageStore = () => {
  const container = useContainer();
  return container.get<ILanguageStore>(STORE.Language);
};
