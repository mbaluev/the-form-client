import { IMenuItemDTO } from '@model/common/menu';

export const isActive = (data: IMenuItemDTO, pathname: string): boolean => {
  if ('url' in data) {
    if (data.active) return data.active(pathname);
    else return data.url === pathname;
  } else if ('items' in data && data.items) {
    return data.items.reduce((prev: boolean, cur: IMenuItemDTO) => {
      return isActive(cur, pathname) || prev;
    }, false);
  }
  return false;
};
