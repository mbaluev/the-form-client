import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IUserListStore from '@store/modules/entities/user/list/interface';

export const useUserListStore = () => {
  const container = useContainer();
  return container.get<IUserListStore>(STORE.UserList);
};
