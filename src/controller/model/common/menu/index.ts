import { ReactElement } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';

export type IMenuItemDTO = IMenuItem & (IMenuItemParentDTO | IMenuItemChildrenDTO);

interface IMenuItem {
  name: string;
  label: string;
  icon?: ReactElement;
  position?: 'top' | 'bottom';
  active?: (pathname: string) => boolean;
  roles?: string[];
}

export interface IMenuItemParentDTO {
  items?: IMenuItemDTO[];
  open?: boolean;
}

export interface IMenuItemChildrenDTO {
  url?: Url;
}
