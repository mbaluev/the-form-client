import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Layout } from '@ui/layout/layout';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { Intro } from '@ui/pages/index/intro';
import { MENU_CONFIG } from '@settings/menu';

export const MasterAnon = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isLoading } = useAppStore();
  const menuProps = { items: MENU_CONFIG };
  return <Layout menuProps={menuProps}>{isLoading ? <Intro /> : children}</Layout>;
});
