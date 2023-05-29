import { useContainer } from '@hooks/useContainer';
import { IFilterViewModel } from '@viewModel/modules/common/filter/interfaces';
import { VIEW_MODEL } from '@viewModel/ids';

export const useFilters = () => {
  const container = useContainer();
  return container.get<IFilterViewModel>(VIEW_MODEL.Filter);
};
