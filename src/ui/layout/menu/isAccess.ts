import { IMenuItemDTO } from '@model/common/menu';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

export const isAccess = (item: IMenuItemDTO) => {
  const { isAuth } = useAuthStore();
  if (item.display === 'authenticate') return isAuth;
  if (item.display === 'not-authenticate') return !isAuth;
  return true;
};
