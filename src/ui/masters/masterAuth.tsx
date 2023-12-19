import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { Intro } from '@ui/pages/index/intro';
import { MENU_CONFIG } from '@settings/menu';

export const MasterAuth = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isAuth } = useAuthStore();
  const menuProps = { items: MENU_CONFIG };
  return <Layout menuProps={menuProps}>{isAuth ? children : <Intro />}</Layout>;
});
