import { useContainer } from '@hooks/useContainer';
import { VIEW_MODEL } from '@viewModel/ids';
import { ILocaleViewModel } from '@viewModel/modules/locale/interface';

export const useLocale = () => {
  const container = useContainer();
  return container.get<ILocaleViewModel>(VIEW_MODEL.Locale);
};
