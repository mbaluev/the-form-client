import { IMenuItemDTO } from '@model/common/menu';
import { useIsAuthenticated } from '@azure/msal-react';

export const isAccess = (item: IMenuItemDTO) => {
  const isAuthenticated = useIsAuthenticated();
  if (item.display === 'authenticate') return isAuthenticated;
  if (item.display === 'not-authenticate') return !isAuthenticated;
  return true;
};
