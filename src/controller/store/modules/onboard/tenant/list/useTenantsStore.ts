import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ITenantsStore from '@store/modules/onboard/tenant/list/interface';

export const useTenantsStore = () => {
  const container = useContainer();
  return container.get<ITenantsStore>(STORE.Tenants);
};
