import { ReactNode } from 'react';
import { MENU_CONFIG_SCHOOL } from '@app/settings/menu/school';
import { Layout } from '@ui/layout/layout';

interface IProps {
  children?: ReactNode;
}

export const MasterAnon = (props: IProps) => {
  const { children } = props;
  const menuProps = { items: MENU_CONFIG_SCHOOL };
  return <Layout menuProps={menuProps}>{children}</Layout>;
};
