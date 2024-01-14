import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IUserItemStore from '@store/modules/entities/user/item/interface';

export const useUserItemStore = () => {
  const container = useContainer();
  return container.get<IUserItemStore>(STORE.UserItem);
};
