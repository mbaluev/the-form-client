import { ReactNode } from 'react';
import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';

interface IProps {
  children?: ReactNode;
}

export const MasterAnon = observer((props: IProps) => {
  const { children } = props;
  return <Layout>{children}</Layout>;
});
