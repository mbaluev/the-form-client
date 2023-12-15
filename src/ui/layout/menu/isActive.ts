import { IMenuItemDTO } from '@model/common/menu';

export const isActive = (data: IMenuItemDTO, pathname: string): boolean => {
  if (data.url) {
    if (data.active) return data.active(pathname);
    if (typeof data.url === 'string') return data.url === pathname;
    if (typeof data.url === 'object') return data.url.pathname === pathname;
  } else if (data.items) {
    return data.items.reduce((prev: boolean, cur: IMenuItemDTO) => {
      return isActive(cur, pathname) || prev;
    }, false);
  }
  return false;
};
