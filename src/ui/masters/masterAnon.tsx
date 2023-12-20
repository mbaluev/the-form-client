import { ReactNode } from 'react';
import { Layout } from '@ui/layout/layout';
import { MENU_CONFIG } from '@settings/menu';

export const MasterAnon = (props: { children?: ReactNode }) => {
  const { children } = props;
  const menuProps = { items: MENU_CONFIG };
  return <Layout menuProps={menuProps}>{children}</Layout>;
};
