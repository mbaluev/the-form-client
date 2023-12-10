import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IAuthStore from '@store/modules/common/auth/interface';

export const useAuthStore = () => {
  const container = useContainer();
  return container.get<IAuthStore>(STORE.Auth);
};
