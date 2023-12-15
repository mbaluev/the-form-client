import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Layout } from '@ui/layout/layout';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { Intro } from '@ui/layout/intro';

export const MasterAnon = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isLoading } = useAppStore();
  return <Layout>{isLoading ? <Intro loading /> : children}</Layout>;
});
