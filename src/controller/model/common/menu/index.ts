import type { ReactElement } from 'react';
import type { Url } from 'next/dist/shared/lib/router/router';

export interface IMenuItemDTO {
  name: string;
  label: string;
  url?: Url;
  display?: 'authenticate' | 'not-authenticate';
  active?: (pathname: string) => boolean;
  items?: IMenuItemDTO[];
  icon?: ReactElement;
  roles?: string[];
}
