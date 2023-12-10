import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Layout } from '@ui/layout/layout';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import Loader from '@components/loader';

export const MasterAnon = observer((props: { children?: ReactNode }) => {
  const { children } = props;
  const { isLoading } = useAppStore();
  return <Layout>{isLoading ? <Loader relative loading /> : children}</Layout>;
});
