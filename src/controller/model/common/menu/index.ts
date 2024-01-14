export type TMenuItemDTO = IMenuItem & (IMenuItemParentDTO | IMenuItemChildrenDTO);

interface IMenuItem {
  name: string;
  label: string;
  icon?: JSX.Element;
  position?: 'top' | 'bottom';
  active?: (pathname: string) => boolean;
  roles?: string[];
}

export interface IMenuItemParentDTO {
  items?: TMenuItemDTO[];
}

export interface IMenuItemChildrenDTO {
  path?: string;
}

export const menuIsActive = (data: TMenuItemDTO, pathname: string): boolean => {
  if ('path' in data) {
    if (data.active) return data.active(pathname);
    else return data.path === pathname;
  } else if ('items' in data && data.items) {
    return data.items.reduce((prev: boolean, cur: TMenuItemDTO) => {
      return menuIsActive(cur, pathname) || prev;
    }, false);
  }
  return false;
};
