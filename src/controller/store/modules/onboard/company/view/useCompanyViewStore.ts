import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ICompanyViewStore from '@store/modules/onboard/company/view/interface';

export const useCompanyViewStore = () => {
  const container = useContainer();
  return container.get<ICompanyViewStore>(STORE.CompanyView);
};
